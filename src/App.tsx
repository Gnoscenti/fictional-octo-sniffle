// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';                 // Your new Hero page
import CourseOverviewPage from './pages/CourseOverviewPage';
import LessonPage from './pages/LessonPage';
import PersonalizedRecapPage from './pages/PersonalizedRecapPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import LessonUpload from './components/admin/LessonUpload';     // Admin upload UI

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Landing/Hero page */}
        <Route index element={<LandingPage />} />

        {/* User-facing routes */}
        <Route path="courses" element={<CourseOverviewPage />} />
        <Route
          path="courses/:courseId/modules/:moduleId/lessons/:lessonId"
          element={<LessonPage />}
        />
        <Route path="recap" element={<PersonalizedRecapPage />} />

        {/* Auth */}
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        {/* ⚙️ Admin */}
        <Route path="admin/upload" element={<LessonUpload />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
