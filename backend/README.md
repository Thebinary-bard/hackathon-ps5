# Hackathon Platform API

A feature-rich backend platform connecting students and businesses. The system utilizes Google Generative AI to evaluate student skills, generate realistic mock tasks, and assess student submissions, acting as an automated evaluator and matching system.

## 🚀 Features

- **Auth & Access Control**: JWT based authentication with distinct roles (Student, Business, Admin).
- **Core Entity System**: Users, Skills, Real-world Gigs, Submissions, Tasks.
- **AI Task Generation**: Businesses/Students can generate mock real-world tasks using Gemini tailored to specific skills.
- **AI Task Evaluation**: Gemini AI evaluates student submission content, scoring it mathematically and providing constructive feedback with strengths and improvement points.
- **Smart Matching System**: Matches the most capable students (highest weighted scores for specific required skills) to jobs/gigs created by businesses.
- **Reliability & Review System**: Users gather scores over time from successfully participating in actual gigs via business verification and AI evaluations.

## 📁 Architecture

The app uses a modular, feature-based architecture to keep domain logic cleanly separated.

```
src/
├── config/             # DB & Env configurations, AI Prompts
├── middlewares/        # Authentication, Validation
├── modules/            # Domain logic (auth, users, tasks, etc)
│   ├── [feature]/
│   │   ├── *.controller.js
│   │   ├── *.service.js
│   │   ├── *.routes.js
│   │   └── *.model.js
├── utils/              # Loggers, Async Handlers, Helpers
├── app.js              # Express app setup (Routes, Error Handlers)
├── server.js           # Server bootstrapper
└── requirements.txt    # System prerequisites (Node.js, MongoDB)
```

## 📋 Prerequisites

Before proceeding, please review the **[`requirements.txt`](./requirements.txt)** file to ensure you have the proper system-level technologies installed (such as Node.js and MongoDB). 
*Note: Because this is a Node.js project, all code-level libraries are gracefully managed in `package.json`!*

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   Create a `.env` file in the root:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   GEMINI_API_KEY=your_gemini_api_key  # Using Gemini currently
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```
