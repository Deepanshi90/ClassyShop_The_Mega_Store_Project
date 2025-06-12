import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SubscribeToNewsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setEmail('');
    }, 1000);
  };

    useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-[#ff5252]">Subscribe to Our Newsletter</h2>
      <p className="text-center text-gray-600 mb-6">
        Stay updated with the latest news and exclusive offers.
      </p>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-green-600 font-semibold text-lg"
        >
          Thank you for subscribing! 🎉
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#ff5252] text-white py-3 rounded-md font-semibold shadow-md hover:bg-[#ff7070de] transition-colors"
          >
            Subscribe
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default SubscribeToNewsletter;
