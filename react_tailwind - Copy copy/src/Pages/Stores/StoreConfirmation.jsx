import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StoreConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl text-center"
      >
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your store registration has been received. Our admin team will verify the details and get back to you shortly.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Please check your email for updates. If verification is successful, your store will be listed soon.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition duration-300"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default StoreConfirmation;
