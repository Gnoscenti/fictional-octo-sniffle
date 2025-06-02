import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for client-side navigation
import AnimatedLogo from '../components/layout/AnimatedLogo';

const HomePage: React.FC = () => { // Renamed to HomePage
  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for email submission logic
    alert("Thank you for subscribing! We'll be in touch with your free lesson.");
    // Consider navigation or clearing the form
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      {/* Animated Logo */}
      <AnimatedLogo />

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mt-8">
        Golden Age Mindset
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-center max-w-xl mt-4 text-gray-300">
        Master AI Investing with the right mindset. Join now for a 7-day free trial.
      </p>

      {/* CTA Button - Using Link component */}
      <Link
        to="/signup"
        className="mt-8 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        Start Free Trial
      </Link>

      {/* Email Capture */}
      <div className="mt-12 w-full max-w-md bg-white rounded-lg shadow-xl p-6 text-gray-900">
        <h2 className="text-2xl font-bold text-center mb-4">Get a Free Lesson</h2>
        <p className="text-center mb-4 text-sm text-gray-600">
          Enter your email to receive our exclusive AI Investing Mistakes PDF.
        </p>
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-gray-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
          >
            Get Free Lesson
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-12 text-sm text-gray-400">
        © {new Date().getFullYear()} Golden Age Mindset. All rights reserved.
      </p>
    </div>
  );
};

export default HomePage; // Exporting as HomePage

