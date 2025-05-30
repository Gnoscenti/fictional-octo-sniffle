# AI Integration Course

A comprehensive platform for learning about AI integration and investment strategies in the age of artificial intelligence.

## Overview

The AI Integration Course platform provides users with tools, insights, and strategies to outthink the hype and invest with confidence in the age of AI. The application features a structured learning path with courses, modules, and lessons, along with premium content gating for subscribers.

## Features

- **Structured Learning Path**: Organized courses with modules and lessons
- **Premium Content**: Subscription-based access to premium lessons
- **Free Preview**: Access to introductory lessons without subscription
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Firebase Integration**: Authentication and content management
- **Markdown Rendering**: Rich lesson content with markdown support

## Tech Stack

- React
- TypeScript
- Firebase (Authentication, Firestore)
- TailwindCSS
- React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project (for authentication and database)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/ai-integration-course.git
cd ai-integration-course
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```
npm start
```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes settings for client-side routing and build configuration.

### Deploying to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy your application

## Firebase Setup

The application requires a specific Firestore data structure:

- `courses` collection (top-level)
  - Course documents with fields: `title`, `description`, `order`, `imageUrl`
  - Each course document contains a `modules` subcollection
    - Module documents with fields: `title`, `description`, `order`
    - Each module document contains a `lessons` subcollection
      - Lesson documents with fields: `title`, `order`, `durationMinutes`, `isFree`, `videoUrl`, `markdownContentPath`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# vvite_edu_mmvp
#   v v i t e _ e d u _ m m v p  
 