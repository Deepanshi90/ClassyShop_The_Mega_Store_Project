import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 size={72} className="text-green-500 drop-shadow-lg" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Message Sent!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for getting in touch with us. We’ll get back to you shortly.
        </p>

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition shadow-md"
        >
          Go to Home
        </button>
      </motion.div>
    </div>
  );
};

export default ContactSuccess;
