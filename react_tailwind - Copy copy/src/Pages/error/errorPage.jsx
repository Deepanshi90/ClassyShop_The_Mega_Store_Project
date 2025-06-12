import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200 text-gray-800 text-center px-4"
    >
      {/* Animated Emoji */}
      <motion.div
        initial={{ y: -15 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-8xl mb-4"
      >
        😿
      </motion.div>

      {/* Large 404 */}
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl max-w-md mt-4 mb-8"
      >
        Uh-oh! This page ran away like a shopping cart with no brakes.
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{
          scale: 1.05,
          background:
            'linear-gradient(135deg, #89f7fe, #66a6ff)',
          boxShadow: '0 0 20px rgba(102, 166, 255, 0.5)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 transition-all duration-300"
      >
        🏠 Go Back Home
      </motion.button>
    </motion.div>
  );
};

export default NotFound;
