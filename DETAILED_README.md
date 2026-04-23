# 🤖 Therabot: AI Mental Health Support System

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technical Architecture](#technical-architecture)
4. [Installation & Setup](#installation--setup)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Frontend Architecture](#frontend-architecture)
8. [Backend Architecture](#backend-architecture)
9. [Security Implementation](#security-implementation)
10. [AI Integration](#ai-integration)
11. [User Experience Design](#user-experience-design)
12. [Testing & Quality Assurance](#testing--quality-assurance)
13. [Deployment Guide](#deployment-guide)
14. [Ethical Considerations](#ethical-considerations)
15. [Future Enhancements](#future-enhancements)
16. [Contributing Guidelines](#contributing-guidelines)
17. [License & Credits](#license--credits)

---

## 🎯 Project Overview

**Therabot** is a sophisticated AI-powered mental health chatbot specifically designed to provide emotional support and therapeutic assistance to university students in Kenya. The system leverages cutting-edge artificial intelligence, evidence-based therapeutic approaches, and culturally sensitive design to deliver accessible mental health support 24/7.

### 🌍 Context & Rationale

Mental health challenges among university students in Kenya are increasingly prevalent, yet access to professional mental health services remains limited due to:
- High costs of professional therapy
- Stigma associated with seeking mental health support
- Limited availability of qualified mental health professionals
- Lack of culturally adapted mental health resources

Therabot addresses these challenges by providing:
- **Immediate Access**: 24/7 availability without appointments
- **Anonymity**: Private conversations without judgment
- **Cultural Adaptation**: Context-aware responses for Kenyan students
- **Professional Standards**: Evidence-based therapeutic techniques

### 🎯 Mission Statement

To provide accessible, culturally sensitive, and evidence-based mental health support to university students through AI technology, while maintaining the highest standards of user safety, privacy, and ethical responsibility.

---

## ✨ Features

### 🤖 Core Chat Features
- **AI-Powered Conversations**: Advanced natural language processing using LLaMA 3.1 model
- **Context-Aware Responses**: Maintains conversation history for coherent dialogues
- **CBT-Based Techniques**: Integrates Cognitive Behavioral Therapy principles
- **Crisis Detection**: Automatic identification of crisis situations
- **Anonymous Access**: 5 free messages for anonymous users
- **Persistent History**: All conversations stored securely in database

### 🔐 Authentication & User Management
- **User Registration**: Secure account creation with email verification
- **JWT Authentication**: Token-based authentication with automatic expiration
- **Profile Management**: User profile customization and settings
- **Session Validation**: Real-time token validation and automatic logout
- **Anonymous Mode**: Guest access with limited functionality

### 📱 User Interface Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Real-Time Typing Indicators**: Visual feedback during AI processing
- **Conversation History**: Easy navigation between different chat sessions
- **Search Functionality**: Quick access to previous conversations
- **Dark/Light Mode**: Eye-friendly interface options
- **Accessibility Features**: WCAG AA compliant design

### 🚨 Safety & Crisis Management
- **Crisis Keyword Detection**: Identifies potentially harmful situations
- **Emergency Resource Integration**: Provides helpline numbers and resources
- **Professional Referral System**: Recommends professional help when needed
- **Content Filtering**: Prevents harmful or inappropriate content
- **User Safety Protocols**: Multiple layers of user protection

### 📊 Analytics & Insights
- **Mood Tracking**: Monitor emotional patterns over time
- **Usage Analytics**: Track engagement and conversation patterns
- **Progress Insights**: Visual representations of mental health journey
- **Resource Recommendations**: Personalized mental health resources

---

## 🏗️ Technical Architecture

### 📐 System Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • UI Components │    │ • API Routes    │    │ • Users         │
│ • State Mgmt    │    │ • Auth Middleware│    │ • Conversations│
│ • HTTP Client   │    │ • AI Integration│    │ • Sessions      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  External APIs  │
                    │                 │
                    │ • OpenRouter    │
                    │ • AI Models     │
                    │ • Email Service │
                    └─────────────────┘
```

### 🔧 Technology Stack

#### Frontend Technologies
- **React 18.2.0**: Modern JavaScript library for building user interfaces
- **Vite 5.2.0**: Fast build tool and development server
- **React Router DOM 6.23.1**: Client-side routing
- **Tailwind CSS 3.4.14**: Utility-first CSS framework
- **Lucide React 0.460.0**: Modern icon library
- **React Context API**: State management for authentication

#### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express 4.19.2**: Web application framework
- **MongoDB 8.4.0**: NoSQL database with Mongoose ODM
- **JWT 9.0.2**: JSON Web Token authentication
- **bcryptjs 2.4.3**: Password hashing
- **dotenv 16.4.5**: Environment variable management

#### AI & External Services
- **OpenRouter API**: Access to advanced AI models
- **LLaMA 3.1-8B-Instruct**: Primary AI model for conversations
- **Custom Prompt Engineering**: Optimized for mental health context

---

## 🚀 Installation & Setup

### 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or pnpm)
- **MongoDB**: Version 5.0 or higher
- **Git**: For version control

### 🔧 Environment Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd therabot
```

#### 2. Install Dependencies
```bash
# Install all dependencies (root, backend, frontend)
pnpm run install-all

# Or install individually
pnpm install
cd backend && pnpm install
cd ../frontend && pnpm install
```

#### 3. Environment Configuration

Create environment files for both backend and frontend:

**Backend Environment (.env)**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/therabot

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# AI Service Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct

# Application Configuration
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173

# Email Service (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend Environment (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Therabot
VITE_APP_VERSION=1.0.0
```

#### 4. Database Setup
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 5. Start Development Servers
```bash
# Start both frontend and backend concurrently
pnpm run dev

# Or start individually
pnpm run server  # Backend only
pnpm run client  # Frontend only
```

### 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs (if implemented)

---

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### POST /api/auth/register
**Description**: Register a new user account

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@university.edu",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@university.edu",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

#### POST /api/auth/login
**Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "email": "john.doe@university.edu",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@university.edu",
      "lastLogin": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

#### GET /api/auth/profile
**Description**: Get current user profile

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@university.edu",
    "avatar": "",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

### 💬 Chat Endpoints

#### POST /api/chat
**Description**: Send message and receive AI response

**Request Body**:
```json
{
  "message": "I'm feeling anxious about my exams",
  "sessionId": "uuid-session-id-or-null"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "response": "I understand that exam anxiety can be overwhelming. Let's work through some strategies...",
    "isCrisis": false,
    "title": "Exam Anxiety Discussion",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

#### POST /api/chat/new
**Description**: Start a new conversation session

**Response**:
```json
{
  "success": true,
  "data": {
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "welcomeMessage": {
      "role": "assistant",
      "content": "Hello! I'm Therabot, your mental health companion...",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

#### GET /api/chat/history/:sessionId
**Description**: Retrieve conversation history

**Response**:
```json
{
  "success": true,
  "data": {
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "messages": [
      {
        "role": "user",
        "content": "I'm feeling anxious about my exams",
        "timestamp": "2024-01-15T10:30:00.000Z"
      },
      {
        "role": "assistant",
        "content": "I understand that exam anxiety can be overwhelming...",
        "timestamp": "2024-01-15T10:30:15.000Z"
      }
    ],
    "isCrisisFlagged": false
  }
}
```

#### GET /api/chat/conversations
**Description**: Get list of user's conversations

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "sessionId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Exam Anxiety Discussion",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z",
      "messageCount": 12,
      "isCrisisFlagged": false
    }
  ]
}
```

#### DELETE /api/chat/conversations/:sessionId
**Description**: Delete a specific conversation

**Response**:
```json
{
  "success": true,
  "message": "Conversation deleted successfully"
}
```

---

## 🗄️ Database Schema

### 👥 Users Collection

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    validate: {
      validator: function(v) {
        return v.length >= 2 && v.length <= 50;
      },
      message: 'Name must be between 2 and 50 characters'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't include password in queries by default
  },
  avatar: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Avatar must be a valid URL'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### 💬 Conversations Collection

```javascript
{
  _id: ObjectId,
  sessionId: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4()
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: false // Allows for anonymous conversations
  },
  title: {
    type: String,
    default: 'New Conversation',
    maxlength: 100
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  isCrisisFlagged: {
    type: Boolean,
    default: false
  },
  moodTags: [{
    type: String,
    enum: ['anxious', 'depressed', 'stressed', 'happy', 'confused', 'angry', 'calm']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### 📊 Analytics Collection (Optional Enhancement)

```javascript
{
  _id: ObjectId,
  user: {
    type: ObjectId,
    ref: 'User',
    required: false
  },
  sessionId: {
    type: String,
    required: true
  },
  moodScore: {
    type: Number,
    min: 1,
    max: 10
  },
  moodTags: [String],
  sessionDuration: Number, // in minutes
  messageCount: Number,
  crisisDetected: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## 🎨 Frontend Architecture

### 📁 Component Structure

```
src/
├── components/
│   ├── Chat.jsx              # Main chat interface
│   ├── ChatMessage.jsx       # Individual message component
│   ├── Sidebar.jsx           # Conversation history sidebar
│   ├── Header.jsx            # Navigation header
│   ├── BottomNav.jsx         # Mobile navigation
│   ├── TypingIndicator.jsx   # AI typing animation
│   ├── SEO.jsx               # SEO meta tags
│   ├── PageLayout.jsx        # Page wrapper component
│   ├── ProfileMenu.jsx       # User profile dropdown
│   ├── ProtectedRoute.jsx    # Authentication guard
│   ├── Welcome.jsx           # Welcome screen
│   └── HomeRedirect.jsx      # Route redirect component
├── context/
│   └── AuthContext.jsx       # Authentication context
├── pages/
│   ├── Login.jsx             # Login page
│   ├── Register.jsx          # Registration page
│   ├── Profile.jsx           # User profile
│   ├── Analytics.jsx         # Mood analytics
│   ├── Settings.jsx          # App settings
│   └── ForgotPassword.jsx    # Password recovery
├── utils/
│   ├── apiInterceptor.js     # API request interceptor
│   └── constants.js          # Application constants
├── styles/
│   ├── index.css             # Global styles
│   └── components.css        # Component-specific styles
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.html                # HTML template
```

### ⚛️ State Management

#### Authentication Context (AuthContext.jsx)
```javascript
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousMessageCount, setAnonymousMessageCount] = useState(0);

  // Session validation and token management
  // Login/logout functionality
  // Anonymous mode handling
  // LocalStorage synchronization
}
```

#### Chat State Management
```javascript
function Chat() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisWarning, setShowCrisisWarning] = useState(false);

  // Message handling
  // Session management
  // Conversation history
  // Crisis detection
}
```

### 🎯 Key Features Implementation

#### Real-Time Message Handling
```javascript
const sendMessage = async (e) => {
  e.preventDefault();
  
  // Add user message to UI immediately
  setMessages(prev => [...prev, {
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  }]);

  // Send to backend for AI response
  const response = await apiFetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage, sessionId })
  });

  // Add AI response
  setMessages(prev => [...prev, {
    role: 'assistant',
    content: response.data.response,
    timestamp: new Date()
  }]);
};
```

#### Session Persistence
```javascript
// Restore session on app load
useEffect(() => {
  const storedSessionId = localStorage.getItem('therabot_session_id');
  if (storedSessionId) {
    setSessionId(storedSessionId);
    loadConversation(storedSessionId);
  }
}, []);

// Save session on changes
useEffect(() => {
  if (sessionId) {
    localStorage.setItem('therabot_session_id', sessionId);
  }
}, [sessionId]);
```

---

## ⚙️ Backend Architecture

### 📁 Backend Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── middleware/
│   └── auth.js               # Authentication middleware
├── models/
│   ├── User.js               # User schema
│   ├── Conversation.js       # Conversation schema
│   └── Analytics.js          # Analytics schema (optional)
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── chat.js               # Chat API routes
│   └── analytics.js          # Analytics routes (optional)
├── services/
│   └── geminiService.js      # AI integration service
├── utils/
│   ├── errorHandler.js       # Error handling utilities
│   └── validators.js         # Input validation
├── .env.example              # Environment variables template
├── package.json              # Dependencies and scripts
└── server.js                 # Express server setup
```

### 🔐 Authentication Middleware

```javascript
// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Continue without authentication for anonymous access
    next();
  }
};
```

### 🤖 AI Service Integration

```javascript
// services/geminiService.js
export const getAIResponse = async (userMessage, conversationHistory = [], retryCount = 0) => {
  const maxRetries = 3;
  const timeouts = [10000, 20000, 30000];

  try {
    // Build conversation context
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

    // Make API request to OpenRouter
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.APP_URL,
        'X-Title': 'Therabot'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, I could not generate a response.';
    
  } catch (error) {
    // Retry logic with progressive timeouts
    if (retryCount < maxRetries && shouldRetry(error)) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return getAIResponse(userMessage, conversationHistory, retryCount + 1);
    }
    
    throw new Error('Failed to get AI response: ' + error.message);
  }
};
```

### 🔍 Crisis Detection

```javascript
export const detectCrisis = (message) => {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die',
    'hurt myself', 'self harm', 'cutting', 'overdose',
    'no reason to live', 'better off dead', 'can\'t go on',
    'end it all', 'take my own life', 'suicidal'
  ];

  const lowerMessage = message.toLowerCase();
  return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
};

export const generateCrisisResponse = () => {
  return {
    message: "I'm concerned about what you're sharing. Your safety is important. Please reach out to emergency services or a mental health professional immediately.",
    resources: [
      { name: 'Emergency Services', phone: '999' },
      { name: 'Befrienders Kenya', phone: '0722-178-178' },
      { name: 'University Counseling Center', action: 'Visit your campus counseling center' }
    ]
  };
};
```

---

## 🔒 Security Implementation

### 🛡️ Authentication Security

#### JWT Token Management
```javascript
// Token generation with expiration
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Token validation middleware
const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired (with 5 minute buffer)
    if (decoded.exp < (currentTime - 300)) {
      throw new Error('Token expired');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

#### Password Security
```javascript
// Password hashing with bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password comparison
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

### 🔒 API Security

#### Request Validation
```javascript
// Input sanitization and validation
const validateUserInput = (req, res, next) => {
  const { email, password, name } = req.body;
  
  // Email validation
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  // Password strength validation
  if (password && password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  
  // Name validation
  if (name && (name.length < 2 || name.length > 50)) {
    return res.status(400).json({ message: 'Name must be between 2 and 50 characters' });
  }
  
  next();
};
```

#### Rate Limiting
```javascript
// Rate limiting implementation
import rateLimit from 'express-rate-limit';

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per window
  message: 'Too many chat requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/chat', chatLimiter);
```

### 🔐 Data Protection

#### Environment Variable Security
```javascript
// Secure environment variable loading
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI', 'OPENROUTER_API_KEY'];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Required environment variable ${varName} is missing`);
  }
});
```

#### CORS Configuration
```javascript
// Secure CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## 🤖 AI Integration

### 🧠 Model Configuration

#### OpenRouter API Setup
```javascript
const OPENROUTER_CONFIG = {
  url: 'https://openrouter.ai/api/v1/chat/completions',
  model: 'meta-llama/llama-3.1-8b-instruct',
  temperature: 0.7,
  max_tokens: 500,
  timeout: 30000
};
```

#### System Prompt Engineering
```javascript
const MENTAL_HEALTH_SYSTEM_PROMPT = `You are Therabot, a compassionate AI mental health support assistant for university students in Kenya.

Your role:
- Provide empathetic, non-judgmental emotional support
- Use CBT (Cognitive Behavioral Therapy) techniques when appropriate
- Offer practical coping strategies for stress, anxiety, and depression
- Encourage professional help for serious concerns
- Be culturally sensitive to Kenyan university context
- Maintain a warm, supportive tone

Guidelines:
- Keep responses concise (2-4 sentences) unless detailed guidance is needed
- Use simple, clear language appropriate for university students
- Acknowledge cultural factors specific to Kenyan context
- Always prioritize user safety and wellbeing

IMPORTANT: You are NOT a replacement for professional therapy. If someone expresses suicidal thoughts or severe distress, gently encourage them to:
- Call emergency services (999) or Befrienders Kenya (0722178178)
- Visit their university counseling center
- Reach out to trusted friends/family

Respond in a conversational, caring manner.`;
```

### 🔄 Context Management

#### Conversation History Handling
```javascript
const buildConversationContext = (messages, maxHistory = 10) => {
  // Get recent messages for context
  const recentMessages = messages.slice(-maxHistory);
  
  return recentMessages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));
};

const getAIResponse = async (userMessage, conversationHistory) => {
  const contextMessages = buildConversationContext(conversationHistory);
  
  const messages = [
    { role: 'system', content: MENTAL_HEALTH_SYSTEM_PROMPT },
    ...contextMessages,
    { role: 'user', content: userMessage }
  ];
  
  // Send to AI model
  return await callAIModel(messages);
};
```

### 🎯 Response Optimization

#### Error Handling & Retries
```javascript
const getAIResponse = async (userMessage, conversationHistory = [], retryCount = 0) => {
  const maxRetries = 3;
  const timeouts = [10000, 20000, 30000]; // Progressive timeouts

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeouts[retryCount] || 30000);

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.APP_URL,
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
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || getDefaultResponse();
    
  } catch (error) {
    if (retryCount < maxRetries && shouldRetry(error)) {
      console.log(`Retrying AI call... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return getAIResponse(userMessage, conversationHistory, retryCount + 1);
    }
    
    return getFallbackResponse(error);
  }
};
```

#### Title Generation
```javascript
const generateTitle = async (messages) => {
  try {
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

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
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
      })
    });

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
    return getFallbackTitle(messages);
  }
};
```

---

## 🎨 User Experience Design

### 📱 Responsive Design Strategy

#### Breakpoint System
```css
/* Mobile Devices */
@media (max-width: 640px) {
  .chat-container {
    padding: 1rem;
  }
  
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}

/* Tablets */
@media (min-width: 641px) and (max-width: 1024px) {
  .chat-container {
    padding: 1.5rem;
  }
  
  .sidebar {
    width: 300px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .chat-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .sidebar {
    width: 350px;
  }
}
```

#### Mobile-First Components
```jsx
// Mobile navigation component
const BottomNav = ({ currentPage }) => {
  const navItems = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex justify-around py-2">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
```

### ♿ Accessibility Implementation

#### Semantic HTML Structure
```jsx
const ChatInterface = () => {
  return (
    <main role="main" aria-label="Chat interface">
      <header role="banner" aria-label="Chat header">
        <h1>Therabot Chat</h1>
      </header>
      
      <section 
        role="log" 
        aria-label="Conversation messages"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((message, index) => (
          <article
            key={index}
            role="article"
            aria-label={`${message.role} message`}
            className={`message ${message.role}`}
          >
            <div className="message-content">
              <p>{message.content}</p>
              <time 
                dateTime={message.timestamp.toISOString()}
                className="message-timestamp"
              >
                {formatTime(message.timestamp)}
              </time>
            </div>
          </article>
        ))}
      </section>
      
      <form 
        role="form" 
        aria-label="Message input"
        onSubmit={sendMessage}
      >
        <label htmlFor="message-input" className="sr-only">
          Type your message
        </label>
        <input
          id="message-input"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          aria-describedby="input-help"
        />
        <small id="input-help" className="sr-only">
          Press Enter to send your message
        </small>
        <button 
          type="submit"
          aria-label="Send message"
          disabled={!inputMessage.trim()}
        >
          <Send aria-hidden="true" />
        </button>
      </form>
    </main>
  );
};
```

#### Keyboard Navigation
```jsx
const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          // Close modals or menus
          closeActiveModal();
          break;
        case 'Tab':
          // Ensure focus stays within interactive elements
          if (!event.shiftKey) {
            trapFocus(event);
          }
          break;
        case 'Enter':
          if (event.ctrlKey || event.metaKey) {
            // Send message on Ctrl/Cmd + Enter
            sendMessage();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};
```

### 🎯 User Experience Enhancements

#### Loading States & Feedback
```jsx
const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-4" role="status" aria-label="AI is typing">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm text-gray-500">Therabot is thinking...</span>
    </div>
  );
};
```

#### Error Handling & User Feedback
```jsx
const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div 
      className="bg-red-50 border border-red-200 rounded-lg p-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
        <div>
          <h3 className="text-sm font-medium text-red-800">
            Something went wrong
          </h3>
          <p className="text-sm text-red-600 mt-1">
            {error.message || 'Unable to send message. Please try again.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```

---

## 🧪 Testing & Quality Assurance

### 📋 Testing Strategy

#### Frontend Testing
```javascript
// Component testing example with React Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Chat from '../components/Chat';
import { AuthProvider } from '../context/AuthContext';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Chat Component', () => {
  test('renders chat interface', () => {
    renderWithProviders(<Chat />);
    
    expect(screen.getByRole('main', { name: /chat interface/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /type your message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('sends message when form is submitted', async () => {
    renderWithProviders(<Chat />);
    
    const input = screen.getByRole('textbox', { name: /type your message/i });
    const sendButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.change(input, { target: { value: 'Hello, Therabot' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Hello, Therabot')).toBeInTheDocument();
    });
  });

  test('displays typing indicator while loading', async () => {
    renderWithProviders(<Chat />);
    
    const input = screen.getByRole('textbox', { name: /type your message/i });
    const sendButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    expect(screen.getByText('Therabot is thinking...')).toBeInTheDocument();
  });
});
```

#### Backend Testing
```javascript
// API endpoint testing with Jest and Supertest
import request from 'supertest';
import app from '../server';
import User from '../models/User';
import Conversation from '../models/Conversation';

describe('Chat API', () => {
  beforeEach(async () => {
    // Clean up test data
    await User.deleteMany({});
    await Conversation.deleteMany({});
  });

  describe('POST /api/chat', () => {
    test('should send message and receive AI response', async () => {
      // Create test user
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      const response = await request(app)
        .post('/api/chat')
        .set('Authorization', `Bearer ${token}`)
        .send({
          message: 'I am feeling anxious',
          sessionId: null
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('response');
      expect(response.body.data).toHaveProperty('sessionId');
    });

    test('should handle crisis detection', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      const response = await request(app)
        .post('/api/chat')
        .set('Authorization', `Bearer ${token}`)
        .send({
          message: 'I want to kill myself',
          sessionId: null
        });

      expect(response.status).toBe(200);
      expect(response.body.data.isCrisis).toBe(true);
    });
  });

  describe('GET /api/chat/conversations', () => {
    test('should return user conversations', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Create test conversations
      await Conversation.create([
        {
          sessionId: 'session1',
          user: user._id,
          title: 'First Conversation',
          messages: [
            { role: 'user', content: 'Hello' },
            { role: 'assistant', content: 'Hi there!' }
          ]
        },
        {
          sessionId: 'session2',
          user: user._id,
          title: 'Second Conversation',
          messages: [
            { role: 'user', content: 'How are you?' },
            { role: 'assistant', content: 'I am doing well!' }
          ]
        }
      ]);

      const response = await request(app)
        .get('/api/chat/conversations')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toHaveProperty('sessionId');
      expect(response.body.data[0]).toHaveProperty('title');
    });
  });
});
```

### 🔍 Quality Assurance Checklist

#### Code Quality
- [ ] ESLint configuration and compliance
- [ ] Prettier code formatting
- [ ] TypeScript type checking (if applicable)
- [ ] Code coverage > 80%
- [ ] Security vulnerability scanning

#### Performance
- [ ] Bundle size optimization
- [ ] Image optimization
- [ ] Lazy loading implementation
- [ ] API response time < 2 seconds
- [ ] Mobile performance score > 90

#### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast ratios
- [ ] ARIA labels and landmarks

#### Security
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Secure headers implementation

---

## 🚀 Deployment Guide

### 🐳 Docker Deployment

#### Dockerfile (Backend)
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

EXPOSE 5000

CMD ["npm", "start"]
```

#### Dockerfile (Frontend)
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    container_name: therabot-db
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    container_name: therabot-backend
    restart: unless-stopped
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://admin:password@mongodb:27017/therabot?authSource=admin
      JWT_SECRET: ${JWT_SECRET}
      OPENROUTER_API_KEY: ${OPENROUTER_API_KEY}
    depends_on:
      - mongodb
    ports:
      - "5000:5000"

  frontend:
    build: ./frontend
    container_name: therabot-frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

### ☁️ Cloud Deployment

#### AWS EC2 Deployment
```bash
# 1. Launch EC2 instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name my-key-pair \
  --security-group-ids sg-903004f8 \
  --user-data file://user-data.sh

# 2. User data script (user-data.sh)
#!/bin/bash
yum update -y
yum install -y docker git
systemctl start docker
systemctl enable docker

# Clone repository
git clone https://github.com/username/therabot.git
cd therabot

# Build and run containers
docker-compose up -d
```

#### Heroku Deployment
```bash
# 1. Install Heroku CLI
# 2. Login to Heroku
heroku login

# 3. Create app
heroku create therabot-app

# 4. Set environment variables
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set OPENROUTER_API_KEY=your_api_key

# 5. Deploy
git subtree push --prefix backend heroku main
```

### 🔧 Environment Configuration

#### Production Environment Variables
```env
# Production Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/therabot

# Security
JWT_SECRET=super_secure_production_jwt_secret_key
JWT_EXPIRE=7d

# AI Services
OPENROUTER_API_KEY=production_openrouter_api_key
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct

# Application
APP_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Monitoring & Logging
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn

# Email Service (Optional)
EMAIL_SERVICE=sendgrid
EMAIL_USER=your_email@service.com
EMAIL_PASS=your_email_password
```

#### Nginx Configuration
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:5000;
    }

    server {
        listen 80;
        server_name yourdomain.com;

        # Frontend static files
        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        # API proxy
        location /api/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    }
}
```

---

## 🧭 Ethical Considerations

### ⚖️ Mental Health Responsibility

#### Professional Boundaries
```javascript
// System prompt with clear boundaries
const PROFESSIONAL_BOUNDARIES = `
IMPORTANT DISCLAIMER: I am an AI assistant, not a licensed mental health professional.

My limitations:
- I cannot diagnose mental health conditions
- I cannot provide medical advice or treatment
- I cannot replace professional therapy or counseling
- My responses are generated by AI, not human professionals

What I CAN do:
- Provide emotional support and active listening
- Share general coping strategies and wellness tips
- Help you explore your thoughts and feelings
- Encourage you to seek professional help when needed
- Provide resources for professional mental health services

If you are experiencing severe mental health symptoms, suicidal thoughts, or crisis:
- Contact emergency services immediately (999 in Kenya)
- Call Befrienders Kenya: 0722-178-178
- Visit your nearest hospital emergency room
- Contact your university counseling services
`;
```

#### Crisis Protocol Implementation
```javascript
const handleCrisisResponse = (userMessage) => {
  const crisisLevel = assessCrisisLevel(userMessage);
  
  switch (crisisLevel) {
    case 'IMMEDIATE_DANGER':
      return {
        response: "I'm very concerned about your safety. Please contact emergency services immediately.",
        actions: [
          { type: 'call', number: '999', label: 'Emergency Services' },
          { type: 'call', number: '0722-178-178', label: 'Befrienders Kenya' },
          { type: 'hospital', label: 'Nearest Emergency Room' }
        ],
        followUp: "Your safety is the top priority. Please reach out to one of these resources now."
      };
      
    case 'HIGH_RISK':
      return {
        response: "I'm concerned about what you're sharing. It's important to talk to someone who can help.",
        actions: [
          { type: 'hotline', number: '0722-178-178', label: 'Befrienders Kenya' },
          { type: 'counseling', label: 'University Counseling Services' },
          { type: 'professional', label: 'Find a Therapist' }
        ],
        followUp: "These resources are specifically trained to help with situations like yours."
      };
      
    case 'MODERATE_CONCERN':
      return {
        response: "It sounds like you're going through a difficult time. Let me share some helpful resources.",
        actions: [
          { type: 'self_help', label: 'Coping Strategies' },
          { type: 'peer_support', label: 'Support Groups' },
          { type: 'counseling', label: 'Counseling Services' }
        ],
        followUp: "Taking the first step to seek support is really important."
      };
      
    default:
      return null;
  }
};
```

### 🔒 Data Privacy & Protection

#### Privacy Policy Implementation
```javascript
// Data handling and privacy controls
const privacyControls = {
  // User consent management
  manageConsent: (userId, consentType) => {
    // Handle data processing consent
  },
  
  // Data deletion requests
  deleteUserData: async (userId) => {
    // GDPR/CCPA compliance
    await User.findByIdAndDelete(userId);
    await Conversation.deleteMany({ user: userId });
    // Log deletion for audit trail
  },
  
  // Data export functionality
  exportUserData: async (userId) => {
    const user = await User.findById(userId);
    const conversations = await Conversation.find({ user: userId });
    
    return {
      personalInfo: user.getProfile(),
      conversations: conversations.map(conv => ({
        sessionId: conv.sessionId,
        title: conv.title,
        createdAt: conv.createdAt,
        messageCount: conv.messages.length
      })),
      exportDate: new Date()
    };
  },
  
  // Anonymization for research
  anonymizeForResearch: (conversation) => {
    // Remove personally identifiable information
    return {
      messages: conversation.messages,
      moodTags: conversation.moodTags,
      duration: calculateDuration(conversation),
      anonymized: true
    };
  }
};
```

#### Data Security Measures
```javascript
// Encryption for sensitive data
const encryptSensitiveData = (data) => {
  const algorithm = 'aes-256-gcm';
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher(algorithm, key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};

// Access logging for compliance
const logDataAccess = (userId, dataType, action) => {
  const accessLog = {
    userId,
    dataType,
    action,
    timestamp: new Date(),
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  };
  
  // Store in audit log
  AuditLog.create(accessLog);
};
```

### 🌍 Cultural Sensitivity

#### Kenyan Context Adaptation
```javascript
const culturalContext = {
  // Kenyan university-specific concerns
  academicStress: {
    factors: [
      'Exam pressure',
      'Competition for limited resources',
      'Family expectations',
      'Financial constraints'
    ],
    coping: [
      'Study groups',
      'University counseling services',
      'Peer support networks',
      'Faculty mentorship programs'
    ]
  },
  
  // Culturally appropriate communication
  communicationStyle: {
    tone: 'respectful and professional',
    formality: 'moderate formality appropriate for university students',
    references: 'Kenyan cultural context and university life',
    language: 'clear English with awareness of local expressions'
  },
  
  // Local resources integration
  localResources: [
    {
      name: 'University Counseling Services',
      type: 'on-campus',
      availability: 'weekdays 8am-5pm',
      cost: 'free for students'
    },
    {
      name: 'Befrienders Kenya',
      type: 'hotline',
      availability: '24/7',
      contact: '0722-178-178'
    },
    {
      name: 'Mental Health Kenya',
      type: 'organization',
      services: 'referrals, support groups, education'
    }
  ]
};
```

---

## 🚀 Future Enhancements

### 📱 Mobile Application Development

#### React Native Implementation
```javascript
// Mobile app features roadmap
const mobileFeatures = {
  version1: {
    core: [
      'Native chat interface',
      'Push notifications for responses',
      'Offline message queue',
      'Biometric authentication',
      'Local data encryption'
    ],
    platform: ['iOS', 'Android']
  },
  
  version2: {
    advanced: [
      'Voice-to-text input',
      'Text-to-speech responses',
      'Mood tracking diary',
      'Breathing exercises',
      'Meditation guides'
    ],
    integrations: [
      'Wearable device connectivity',
      'Health app integration',
      'Calendar integration'
    ]
  },
  
  version3: {
    professional: [
      'Video counseling integration',
      'Professional directory',
      'Appointment booking',
      'Secure video calls',
      'Payment processing'
    ]
  }
};
```

### 🤝 Advanced AI Features

#### Multi-Modal AI Integration
```javascript
const advancedAI = {
  voiceInterface: {
    speechToText: 'Google Speech-to-Text API',
    textToSpeech: 'Amazon Polly',
    emotionDetection: 'Real-time sentiment analysis',
    voiceBiometrics: 'Speaker identification for security'
  },
  
  imageAnalysis: {
    emotionRecognition: 'Facial expression analysis',
    moodTracking: 'Visual mood indicators',
    wellnessMetrics: 'Facial wellness assessment'
  },
  
  predictiveAnalytics: {
    riskAssessment: 'Early warning system',
    progressTracking: 'Therapeutic outcome prediction',
    resourceRecommendation: 'Personalized resource matching'
  }
};
```

### 🌐 Multi-Language Support

#### Internationalization Strategy
```javascript
const i18nConfig = {
  languages: [
    { code: 'en', name: 'English', default: true },
    { code: 'sw', name: 'Kiswahili', priority: 1 },
    { code: 'fr', name: 'French', priority: 2 },
    { code: 'ar', name: 'Arabic', priority: 3 }
  ],
  
  translationStrategy: {
    aiTranslation: 'Real-time AI translation',
    professionalTranslation: 'Professional mental health terminology',
    culturalAdaptation: 'Culturally appropriate expressions',
    regionalDialects: 'Local variations and idioms'
  },
  
  implementation: {
    frontend: 'react-i18next integration',
    backend: 'Database localization',
    ai: 'Multilingual model fine-tuning',
    content: 'Localized mental health resources'
  }
};
```

### 📊 Advanced Analytics Platform

#### Comprehensive Analytics Dashboard
```javascript
const analyticsFeatures = {
  userAnalytics: {
    engagement: [
      'Daily active users',
      'Session duration',
      'Message frequency',
      'Retention rates'
    ],
    outcomes: [
      'Mood improvement tracking',
      'Crisis intervention metrics',
      'Resource utilization',
      'Progress indicators'
    ]
  },
  
  systemAnalytics: {
    performance: [
      'API response times',
      'AI model accuracy',
      'System uptime',
      'Error rates'
    ],
    usage: [
      'Peak usage times',
      'Geographic distribution',
      'Device preferences',
      'Feature utilization'
    ]
  },
  
  researchAnalytics: {
    insights: [
      'Mental health trends',
      'Demographic patterns',
      'Treatment effectiveness',
      'Resource impact'
    ],
    compliance: [
      'Privacy compliance tracking',
      'Data access logs',
      'Consent management',
      'Audit trails'
    ]
  }
};
```

### 🔗 Integration Ecosystem

#### Third-Party Service Integration
```javascript
const integrationPartners = {
  healthcare: [
    {
      name: 'Kenyan Ministry of Health',
      type: 'Government',
      integration: 'Resource directory',
      benefits: ['Official resources', 'Credibility', 'National coverage']
    },
    {
      name: 'University Health Centers',
      type: 'Educational',
      integration: 'Appointment booking',
      benefits: ['Direct access', 'Student focus', 'On-campus services']
    }
  ],
  
  technology: [
    {
      name: 'WhatsApp Business API',
      type: 'Communication',
      integration: 'Chat expansion',
      benefits: ['Wider reach', 'Familiar interface', 'Offline support']
    },
    {
      name: 'Google Calendar',
      type: 'Productivity',
      integration: 'Appointment scheduling',
      benefits: ['Reminder system', 'Calendar sync', 'Time management']
    }
  ],
  
  research: [
    {
      name: 'Academic Institutions',
      type: 'Research',
      integration: 'Data analysis',
      benefits: ['Research insights', 'Evidence-based improvements', 'Academic validation']
    }
  ]
};
```

---

## 🤝 Contributing Guidelines

### 📋 Development Workflow

#### Getting Started
```bash
# 1. Fork the repository
git clone https://github.com/your-username/therabot.git
cd therabot

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Install dependencies
pnpm run install-all

# 4. Start development
pnpm run dev
```

#### Code Standards
```javascript
// ESLint configuration (.eslintrc.js)
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};

// Prettier configuration (.prettierrc)
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### Testing Requirements
```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test suite
pnpm test:unit    # Unit tests
pnpm test:integration  # Integration tests
pnpm test:e2e     # End-to-end tests
```

### 🔄 Pull Request Process

#### PR Template
```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Environment variables documented
- [ ] Security considerations addressed

## Screenshots (if applicable)
Add screenshots to illustrate changes.

## Additional Notes
Any additional context or considerations.
```

#### Review Process
1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: At least one team member review required
3. **Security Review**: For authentication or data handling changes
4. **Accessibility Review**: For UI/UX changes
5. **Approval**: Merge after all checks pass and reviews approved

---

## 📜 License & Credits

### 📄 License Information

```
MIT License

Copyright (c) 2024 Therabot Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 👥 Project Credits

#### Development Team
- **Project Lead**: [Your Name] - Full-stack development and AI integration
- **UI/UX Designer**: [Designer Name] - User experience and interface design
- **Backend Developer**: [Developer Name] - API development and database architecture
- **Frontend Developer**: [Developer Name] - React components and user interface

#### Special Thanks
- **University Mental Health Services**: For consultation and guidance
- **Befrienders Kenya**: For crisis support resources and collaboration
- **OpenRouter**: For providing AI model access
- **Open Source Community**: For the amazing tools and libraries used

#### Third-Party Libraries & Services

**Frontend Dependencies**:
- React 18.2.0 - UI framework
- Vite 5.2.0 - Build tool
- Tailwind CSS 3.4.14 - Styling framework
- React Router 6.23.1 - Client-side routing
- Lucide React 0.460.0 - Icon library

**Backend Dependencies**:
- Express 4.19.2 - Web framework
- MongoDB 8.4.0 - Database
- Mongoose - ODM
- JWT 9.0.2 - Authentication
- bcryptjs 2.4.3 - Password hashing

**External Services**:
- OpenRouter API - AI model access
- LLaMA 3.1-8B-Instruct - AI model
- MongoDB Atlas - Database hosting (production)

### 📞 Contact Information

- **Project Repository**: https://github.com/your-username/therabot
- **Documentation**: https://therabot-docs.vercel.app
- **Support Email**: support@therabot.com
- **Bug Reports**: https://github.com/your-username/therabot/issues

### 🌟 Acknowledgments

This project was developed as part of a commitment to improving mental health support for university students in Kenya. We acknowledge the importance of accessible, culturally sensitive mental health resources and hope this contribution makes a meaningful difference in the lives of students.

---

## 📈 Project Metrics & Impact

### 📊 Usage Statistics (Projected)
- **Target Users**: 50,000+ university students in Kenya
- **Expected Daily Active Users**: 5,000+
- **Conversations per Day**: 20,000+
- **Crisis Interventions**: 50+ per month
- **User Satisfaction Goal**: 4.5/5 stars

### 🎯 Success Metrics
- **Accessibility**: 24/7 availability across all devices
- **Anonymity**: 60% of users accessing anonymously
- **Retention**: 70% monthly user retention
- **Crisis Response**: < 2 minute response time for crisis situations
- **User Growth**: 20% month-over-month growth

### 🌍 Social Impact
- **Mental Health Awareness**: Increased awareness and destigmatization
- **Early Intervention**: Earlier identification of mental health concerns
- **Resource Connection**: Improved access to professional mental health services
- **Research Contribution**: Data for mental health research in Kenyan context

---

*This documentation represents a comprehensive overview of the Therabot project and is intended for academic evaluation, development reference, and stakeholder understanding. The project continues to evolve with regular updates and improvements based on user feedback and technological advancements.*
