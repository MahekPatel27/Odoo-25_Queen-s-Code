# StackIt - A Minimal Q&A Forum Platform

A modern, responsive question-and-answer platform designed for collaborative learning and structured knowledge sharing.

## 🚀 Features

### Core Features
- *Ask Questions*: Create questions with rich text editor, tags, and descriptions
- *Rich Text Editor*: Support for formatting, lists, emojis, links, and images
- *Answer System*: Post and format answers using the same rich editor
- *Voting System*: Upvote/downvote answers and accept best answers
- *Tagging System*: Organize questions with relevant tags
- *Real-time Notifications*: Get notified of new answers, comments, and mentions
- *User Authentication*: Secure login/register system with JWT
- *Responsive Design*: Works seamlessly on desktop, tablet, and mobile

### User Roles
- *Guest*: View all questions and answers
- *User*: Register, login, post questions/answers, vote
- *Admin*: Moderate content and manage users

## 🛠 Tech Stack

### Backend
- *Node.js* with Express.js
- *MongoDB* with Mongoose ODM
- *Socket.io* for real-time features
- *JWT* for authentication
- *Cloudinary* for image uploads
- *Joi* for data validation

### Frontend
- *React.js* with hooks
- *React Router* for navigation
- *Axios* for API calls
- *Socket.io-client* for real-time updates
- *React Quill* for rich text editing
- *Tailwind CSS* for styling
- *React Hot Toast* for notifications

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation

1. *Clone the repository*
   bash
   git clone <repository-url>
   cd stackit-qa-forum
   

2. *Install dependencies*
   bash
   npm run install-all
   

3. *Environment Setup*
   Create a .env file in the root directory:
   env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   

4. *Start the development server*
   bash
   npm run dev
   

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure


stackit-qa-forum/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS styles
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.js         # Server entry point
├── package.json
└── README.md


## 🔧 API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user

### Questions
- GET /api/questions - Get all questions (with pagination)
- POST /api/questions - Create new question
- GET /api/questions/:id - Get question by ID
- PUT /api/questions/:id - Update question
- DELETE /api/questions/:id - Delete question

### Answers
- POST /api/questions/:id/answers - Add answer to question
- PUT /api/answers/:id - Update answer
- DELETE /api/answers/:id - Delete answer
- POST /api/answers/:id/vote - Vote on answer

### Tags
- GET /api/tags - Get all tags
- POST /api/tags - Create new tag

### Notifications
- GET /api/notifications - Get user notifications
- PUT /api/notifications/:id/read - Mark notification as read

## 🎨 Key Features Implementation

### Database Design (35%)
- Well-structured MongoDB schema with proper relationships
- Optimized indexes for performance
- Real-time sync using Socket.io

### Coding Standards (40%)
- Comprehensive input validation (frontend & backend)
- Dynamic configuration (no hardcoded values)
- Modular, reusable components
- Performance optimization (caching, lazy loading)
- Robust error handling with fallback messages
- ESLint configuration for code quality
- Clean, maintainable code structure

### UI/UX Design (15%)
- Fully responsive design
- Pagination for questions and answers
- Search and filter functionality
- Proper color contrast and accessibility
- Modern, intuitive interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request



