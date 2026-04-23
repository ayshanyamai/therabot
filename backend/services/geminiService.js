// Ensure environment variables are loaded
import dotenv from 'dotenv';
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MENTAL_HEALTH_SYSTEM_PROMPT = `You are Therabot, a compassionate AI mental health support assistant for university students in Kenya.

Your role:
- Provide empathetic, non-judgmental emotional support
- Use CBT (Cognitive Behavioral Therapy) techniques when appropriate
- Offer practical coping strategies for stress, anxiety, and depression
- Encourage professional help for serious concerns
- Be culturally sensitive to Kenyan university context
- Maintain a warm, supportive tone

IMPORTANT: You are NOT a replacement for professional therapy. If someone expresses suicidal thoughts or severe distress, gently encourage them to:
- Call emergency services (999) or Befrienders Kenya (0722178178)
- Visit their university counseling center
- Reach out to trusted friends/family

Respond in a conversational, caring manner. Keep responses concise (2-4 sentences) unless detailed guidance is needed.`;

export const getAIResponse = async (userMessage, conversationHistory = [], retryCount = 0) => {
  const maxRetries = 3;
  const timeouts = [10000, 20000, 30000]; // Progressive timeouts

  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    // Build messages array for OpenRouter
    const messages = [
      {
        role: 'system',
        content: MENTAL_HEALTH_SYSTEM_PROMPT
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeouts[retryCount] || 30000);

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.APP_URL || 'http://localhost:5000',
        'X-Title': 'Therabot'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, I could not generate a response.';
  } catch (error) {
    console.error(`OpenRouter API Error (attempt ${retryCount + 1}):`, error.message);

    // Retry on network errors or timeouts
    if (retryCount < maxRetries &&
      (error.name === 'AbortError' ||
        error.code === 'ETIMEDOUT' ||
        error.message.includes('fetch failed'))) {

      console.log(`Retrying OpenRouter API call... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Wait before retry
      return getAIResponse(userMessage, conversationHistory, retryCount + 1);
    }

    // Return fallback response if all retries fail
    if (error.name === 'AbortError' || error.code === 'ETIMEDOUT') {
      return "I'm having trouble connecting right now. Please try again in a moment. Your mental health is important, and I want to give you the full attention you deserve.";
    }

    throw new Error('Failed to get AI response: ' + error.message);
  }
};

export const detectCrisis = (message) => {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die',
    'hurt myself', 'self harm', 'cutting', 'overdose',
    'no reason to live', 'better off dead', 'can\'t go on'
  ];

  const lowerMessage = message.toLowerCase();
  return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
};

export const generateTitle = async (messages) => {
  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    // Get first user message and response for context
    const firstExchange = messages.slice(0, 4);
    const conversationText = firstExchange
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    const titlePrompt = `Based on this conversation, generate a short, meaningful title (3-5 words max) that summarizes the topic.

Conversation:
${conversationText}

Rules:
- Keep it under 5 words
- Make it descriptive of the emotional topic
- No quotes in the title
- Example: "Exam Stress Discussion" or "Anxiety About Future"

Title:`;

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for title generation

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.APP_URL || 'http://localhost:5000',
        'X-Title': 'Therabot'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates short, meaningful titles for conversations.'
          },
          {
            role: 'user',
            content: titlePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 50
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    let title = data.choices[0]?.message?.content?.trim() || 'Mental Health Support';

    // Clean up the title
    title = title.replace(/^["']|["']$/g, ''); // Remove quotes
    title = title.split('\n')[0]; // Take first line only

    if (title.length > 50) {
      title = title.substring(0, 47) + '...';
    }

    return title || 'Mental Health Support';
  } catch (error) {
    console.error('Title generation error:', error);
    // Fallback: use first user message excerpt
    const firstUserMsg = messages.find(m => m.role === 'user');
    if (firstUserMsg) {
      const excerpt = firstUserMsg.content.slice(0, 30);
      return excerpt + (firstUserMsg.content.length > 30 ? '...' : '');
    }
    return 'Mental Health Support';
  }
};
