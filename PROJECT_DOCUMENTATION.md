# Therabot: AI Mental Health Support System

## Project Overview

**Therabot** is an AI-powered mental health chatbot specifically designed for university students in Kenya. The system provides 24/7 emotional support, anonymous chat capabilities, and culturally sensitive mental health resources using Cognitive Behavioral Therapy (CBT) techniques.

### Key Features
- 🤖 **AI-Powered Conversations**: Uses OpenRouter API with LLaMA 3.1 model for empathetic responses
- 🔐 **Anonymous & Authenticated Access**: 5 free messages for anonymous users, full features for registered users
- 💾 **Persistent Chat History**: All conversations stored in MongoDB database
- 🚨 **Crisis Detection**: Automatic detection of crisis keywords with emergency resource suggestions
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🧠 **CBT-Based Support**: Integrates Cognitive Behavioral Therapy techniques
- 🌍 **Culturally Adapted**: Specifically tailored for Kenyan university context

## Technical Architecture

### Frontend (React + Vite)
- **Framework**: React 18.2.0 with Vite
- **Styling**: Tailwind CSS 3.4.14
- **Routing**: React Router DOM 6.23.1
- **Icons**: Lucide React 0.460.0
- **State Management**: React Context API (AuthContext)
- **HTTP Client**: Fetch API with custom headers

### Backend (Node.js + Express)
- **Runtime**: Node.js with ES Modules
- **Framework**: Express 4.19.2
- **Database**: MongoDB with Mongoose 8.4.0
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **AI Integration**: OpenRouter API with LLaMA 3.1-8B-Instruct model
- **Environment**: dotenv for configuration management

### Database Schema

#### Users Collection
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase),
  password: String (required, min 6 chars, hashed),
  avatar: String (optional),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date
}
```

#### Conversations Collection
```javascript
{
  sessionId: String (required, unique),
  user: ObjectId (ref: 'User', optional),
  title: String (default: 'New Conversation'),
  messages: [{
    role: String (enum: ['user', 'assistant']),
    content: String,
    timestamp: Date
  }],
  isCrisisFlagged: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /forgot-password` - Password reset request

### Chat Routes (`/api/chat`)
- `POST /` - Send message and get AI response
- `POST /new` - Start new conversation
- `GET /history/:sessionId` - Load conversation history
- `GET /conversations` - Get user's conversation list
- `DELETE /conversations/:sessionId` - Delete conversation

## Security Features

### Authentication & Authorization
- JWT-based authentication with secure token storage
- Password hashing with bcryptjs (12 rounds)
- Optional authentication middleware for anonymous access
- Role-based access control (user/admin)

### Data Protection
- Input validation and sanitization
- CORS configuration for cross-origin requests
- Environment variable protection for API keys
- Secure password storage (never stored in plain text)

### Crisis Management
- Keyword-based crisis detection algorithm
- Automatic flagging of at-risk conversations
- Emergency contact integration (999, Befrienders Kenya)
- Professional help recommendations

## Frontend Components

### Core Components
- **Chat.jsx**: Main chat interface with message handling
- **Sidebar.jsx**: Conversation history and navigation
- **AuthContext.jsx**: Global authentication state management
- **Header.jsx**: Navigation and user menu
- **BottomNav.jsx**: Mobile navigation

### Page Components
- **Login.jsx**: User authentication interface
- **Register.jsx**: User registration with validation
- **Profile.jsx**: User profile management
- **Analytics.jsx**: Mood tracking and insights
- **Settings.jsx**: Application preferences

### Utility Components
- **SEO.jsx**: Search engine optimization
- **ChatMessage.jsx**: Individual message rendering
- **TypingIndicator.jsx**: Real-time typing feedback
- **ProtectedRoute.jsx**: Authentication guard

## AI Integration

### OpenRouter API Configuration
- **Model**: meta-llama/llama-3.1-8b-instruct
- **Temperature**: 0.7 for balanced creativity
- **Max Tokens**: 500 for concise responses
- **Retry Logic**: Progressive timeouts (10s, 20s, 30s)

### System Prompt Design
```
You are Therabot, a compassionate AI mental health support assistant for university students in Kenya.

Your role:
- Provide empathetic, non-judgmental emotional support
- Use CBT (Cognitive Behavioral Therapy) techniques when appropriate
- Offer practical coping strategies for stress, anxiety, and depression
- Encourage professional help for serious concerns
- Be culturally sensitive to Kenyan university context
- Maintain a warm, supportive tone
```

### Features
- **Context Awareness**: Maintains 10-message conversation history
- **Title Generation**: Automatic conversation title generation
- **Crisis Response**: Specialized handling for crisis situations
- **Fallback Mechanisms**: Graceful degradation on API failures

## User Experience Design

### Responsive Design
- **Mobile-First**: Optimized for mobile devices (320px+)
- **Tablet Support**: Adaptive layouts for tablets (768px+)
- **Desktop Experience**: Full-featured interface (1024px+)
- **Touch Gestures**: Mobile-friendly interactions

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Clear focus indicators

### Performance Optimizations
- **Lazy Loading**: Component-based code splitting
- **Image Optimization**: Responsive image handling
- **Caching Strategy**: LocalStorage for session persistence
- **Bundle Optimization**: Vite build optimizations

## Deployment & Environment

### Environment Variables
```env
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/therabot
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct
APP_URL=http://localhost:5000

# Frontend (Vite)
VITE_API_URL=http://localhost:5000/api
```

### Development Setup
```bash
# Install dependencies
pnpm run install-all

# Start development servers
pnpm run dev

# Individual services
pnpm run server  # Backend only
pnpm run client  # Frontend only
```

### Production Considerations
- **HTTPS**: SSL/TLS certificate implementation
- **Database**: MongoDB Atlas or managed MongoDB instance
- **Environment**: Production environment variables
- **Monitoring**: Application performance monitoring
- **Logging**: Structured logging implementation

## Ethical Considerations

### Mental Health Responsibility
- **Clear Disclaimer**: Not a replacement for professional therapy
- **Emergency Resources**: Prominent crisis helpline information
- **Professional Referrals**: Encourages professional help when needed
- **Cultural Sensitivity**: Kenyan context-aware responses

### Data Privacy
- **Anonymity Option**: Anonymous access for sensitive topics
- **Data Minimization**: Only collect necessary user information
- **Secure Storage**: Encrypted sensitive data storage
- **User Control**: Ability to delete conversation history

### Limitations & Transparency
- **AI Transparency**: Clear indication of AI nature
- **Capability Boundaries**: Honest about system limitations
- **Human Oversight**: Regular review and improvement processes
- **User Feedback**: Mechanisms for user input and improvement

## Future Enhancements

### Planned Features
- **Multi-language Support**: Swahili and other local languages
- **Voice Interface**: Speech-to-speech conversations
- **Professional Directory**: Directory of Kenyan mental health professionals
- **Group Support**: Peer support group features
- **Mood Tracking**: Advanced analytics and mood patterns

### Technical Improvements
- **Real-time Communication**: WebSocket implementation
- **Mobile App**: Native iOS/Android applications
- **AI Model Updates**: Latest mental health AI models
- **Analytics Dashboard**: Advanced user insights
- **Integration APIs**: Third-party mental health service integration

## Project Statistics

### Codebase Metrics
- **Total Files**: 25+ components and modules
- **Lines of Code**: ~15,000 lines (combined frontend/backend)
- **Dependencies**: 20+ production dependencies
- **Test Coverage**: Manual testing implemented

### Development Timeline
- **Architecture Design**: 2 weeks
- **Backend Development**: 3 weeks
- **Frontend Development**: 4 weeks
- **AI Integration**: 2 weeks
- **Testing & Refinement**: 2 weeks

## Conclusion

Therabot represents a comprehensive approach to AI-assisted mental health support, combining modern web technologies with ethical considerations and cultural sensitivity. The system provides immediate, accessible support while maintaining professional standards and user safety.

The project demonstrates proficiency in:
- Full-stack web development (React + Node.js)
- AI integration and prompt engineering
- Database design and management
- User experience design
- Security implementation
- Ethical AI development

This documentation provides a complete overview of the Therabot system for academic evaluation and future development reference.
