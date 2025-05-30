// src/pages/LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image: replace with your actual asset path */}
      <img
        src="/hero-background.jpg"
        alt="AI Integration Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Transparent clickable overlays */}
      <div className="absolute inset-0 z-10">
        <button
          className="absolute top-[10%] left-[30%] w-[15%] h-[12%] bg-transparent"
          onClick={() => navigate('/signup')}
        />
        <button
          className="absolute top-[10%] left-[65%] w-[15%] h-[12%] bg-transparent"
          onClick={() => navigate('/login')}
        />
        <button
          className="absolute top-[40%] left-[65%] w-[12%] h-[10%] bg-transparent"
          onClick={() => navigate('/courses')}
        />
        <button
          className="absolute top-[40%] left-[25%] w-[12%] h-[10%] bg-transparent"
          onClick={() => navigate('/about')}
        />
        <button
          className="absolute bottom-[10%] left-[30%] w-[15%] h-[12%] bg-transparent"
          onClick={() => navigate('/contact')}
        />
      </div>

      {/* Centered tagline */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-white text-5xl font-bold">
        Master AI Integration Today
      </div>
    </div>
  );
};

export default LandingPage;
