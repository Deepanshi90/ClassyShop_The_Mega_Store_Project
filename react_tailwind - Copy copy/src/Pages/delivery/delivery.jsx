import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  },
});

// New animation for image
const imageMotion = {
  animate: {
    scale: [1, 1.05, 1],   // zoom in and out
    opacity: [0.8, 1, 0.8], // subtle fade in and out
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

const DeliveryInfoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    { title: 'Order Placed', desc: 'We’ve received your order and are preparing it for dispatch.' },
    { title: 'Packed & Ready', desc: 'Our team carefully packages your items to ensure they arrive safely.' },
    { title: 'Shipped', desc: 'Your package is on its way via our trusted courier partners.' },
    { title: 'Out for Delivery', desc: 'Our delivery agent is bringing your package right to your doorstep.' },
    { title: 'Delivered', desc: 'Thank you for shopping with us! Enjoy your purchase.' },
  ];

  return (
    <section className="bg-white text-gray-800">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <h1 className="text-5xl font-bold mb-4">Fast & Reliable Delivery</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From our warehouse to your doorstep — our streamlined delivery process ensures your orders arrive quickly and safely.
        </p>
      </motion.div>

      {/* Animated Delivery Illustration */}
      <motion.div
        className="max-w-5xl mx-auto px-6 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.2)}
      >
        <motion.img
          src="https://plus.unsplash.com/premium_photo-1667518243528-94444cc01642?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Delivery Illustration"
          className="rounded-lg shadow-xl w-full object-cover"
          animate={imageMotion.animate}
        />
      </motion.div>

      {/* Timeline Steps */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-10 text-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(index * 0.2)}
            >
              <div className="text-4xl font-bold text-[#ff5252] mb-2">{index + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <motion.div
        className="py-20 text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.4)}
      >
        <h2 className="text-3xl font-bold mb-4">Track Your Order</h2>
        <p className="text-gray-600 mb-6">
          Enter your order number to view the current status and estimated delivery date.
        </p>
        <input
          type="text"
          placeholder="Enter Order ID"
          className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-400"
        />
       <Link to="/my-orders">
        <button className="ml-4 px-6 py-3 bg-[#ff5252] text-white font-semibold rounded-md hover:bg-[rgba(255,82,82,0.99)] transition-all duration-300 cursor-pointer" >
          Track
        </button></Link>
      </motion.div>
    </section>
  );
};

export default DeliveryInfoPage;
