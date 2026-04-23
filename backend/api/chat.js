import { v4 as uuidv4 } from 'uuid';
import Conversation from '../models/Conversation.js';
import { getAIResponse, detectCrisis, generateTitle } from '../services/geminiService.js';
import { optionalAuth } from '../middleware/auth.js';

export default async function handler(req, res) {
  // Apply CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Apply optional auth middleware
    await optionalAuth(req, res, () => {});

    const { sessionId } = req.query;
    const userId = req.user ? req.user._id : null;

    if (req.method === 'POST') {
      if (req.url.endsWith('/new')) {
        // Start new conversation
        const newSessionId = uuidv4();
        const conversation = new Conversation({
          sessionId: newSessionId,
          user: userId,
          messages: [{
            role: 'assistant',
            content: 'Hello! I\'m Therabot, your mental health companion. I\'m here to listen and support you. How are you feeling today?',
            timestamp: new Date(),
          }],
        });

        await conversation.save();

        res.json({
          sessionId: newSessionId,
          welcomeMessage: conversation.messages[0],
        });
        return;
      }

      // Regular chat message
      const { message } = req.body;
      const currentSessionId = sessionId || uuidv4();

      if (!message) {
        return res.status(400).json({ message: 'Message is required' });
      }

      // Find or create conversation
      let conversation = await Conversation.findOne({ sessionId: currentSessionId });
      if (!conversation) {
        conversation = new Conversation({
          sessionId: currentSessionId,
          user: userId,
          messages: []
        });
      }

      // If user is authenticated and conversation has no user, associate it
      if (userId && !conversation.user) {
        conversation.user = userId;
      }

      // Check for crisis keywords
      const isCrisis = detectCrisis(message);
      if (isCrisis) {
        conversation.isCrisisFlagged = true;
      }

      // Prepare conversation history for context (last 10 messages)
      const recentHistory = conversation.messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Get AI response
      let aiResponse;
      try {
        aiResponse = await getAIResponse(message, recentHistory);
      } catch (error) {
        console.error('AI Response Error:', error);
        aiResponse = "I'm here to listen and support you. While I'm experiencing some technical difficulties, please know that your feelings are valid and important. Could you tell me more about what's on your mind?";
      }

      // Add messages to conversation
      conversation.messages.push(
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      );

      // Generate title if conversation has at least 2 messages and no title yet
      if (conversation.messages.length >= 2 && conversation.title === 'New Conversation') {
        try {
          const newTitle = await generateTitle(conversation.messages);
          conversation.title = newTitle;
        } catch (titleError) {
          console.error('Title generation failed:', titleError);
        }
      }

      await conversation.save();

      res.json({
        sessionId: currentSessionId,
        response: aiResponse,
        isCrisis,
        title: conversation.title,
        timestamp: new Date(),
      });
    } else if (req.method === 'GET') {
      if (sessionId && req.url.includes('/history')) {
        // Get conversation history
        const conversation = await Conversation.findOne({ sessionId });

        if (!conversation) {
          return res.status(404).json({ message: 'Conversation not found' });
        }

        res.json({
          sessionId: conversation.sessionId,
          messages: conversation.messages,
          isCrisisFlagged: conversation.isCrisisFlagged,
        });
      } else {
        // Get all conversations
        let query = {};
        if (userId) {
          query = { user: userId };
        } else {
          query = { user: null };
        }

        const conversations = await Conversation.find(query)
          .sort({ updatedAt: -1 })
          .select('sessionId createdAt updatedAt messages isCrisisFlagged title');

        const formatted = conversations.map(conv => ({
          sessionId: conv.sessionId,
          title: conv.title || 'New Conversation',
          createdAt: conv.createdAt,
          updatedAt: conv.updatedAt,
          messageCount: conv.messages.length,
          isCrisisFlagged: conv.isCrisisFlagged,
        }));

        res.json(formatted);
      }
    } else if (req.method === 'DELETE') {
      // Delete conversation
      if (!sessionId) {
        return res.status(400).json({ message: 'Session ID is required' });
      }

      const result = await Conversation.findOneAndDelete({ sessionId });

      if (!result) {
        return res.status(404).json({ message: 'Conversation not found' });
      }

      res.json({ message: 'Conversation deleted' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({
      message: 'Failed to process request',
      error: error.message
    });
  }
}
