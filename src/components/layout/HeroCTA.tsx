import React from 'react';
import AnimatedAvatar from './AnimatedAvatar';
import { motion } from 'framer-motion';

const HeroCTA: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center text-center px-6">
      {/* Animated Avatar */}
      <AnimatedAvatar />

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold mt-8 leading-tight max-w-3xl">
        The AI Revolution Will Reward Those Who Think Differently.
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl mt-6 max-w-2xl text-gray-300">
        The AI integration course gives you the tools, insights, and strategies to outthink the hype, empowering you with knowledge that's clear, actionable, and cuts through the noise. Gain the confidence you need to operate in the age of AI.
        Join today and unlock your 7-day free trial.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <motion.a
          href="/signup"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg overflow-hidden group"
        >
          <span className="relative z-10">Start Free Trial</span>
          {/* Glow ring on hover */}
          <span className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 blur-md transition duration-300"></span>
        </motion.a>

        <motion.a
          href="/free-lesson"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 250 }}
          className="text-blue-400 hover:text-blue-500 underline text-lg mt-2 md:mt-0"
        >
          Explore Free Lesson
        </motion.a>
      </div>
    </section>
  );
};

export default HeroCTA;
