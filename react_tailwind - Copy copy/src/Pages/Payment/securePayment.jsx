import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  },
});

const SecurePayment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-white min-h-screen px-6 py-16 md:py-24 max-w-5xl mx-auto text-gray-900">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
        style={{ color: '#ff5252' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        Secure Payment at ClassyShop
      </motion.h1>

      <motion.p
        className="text-lg text-center max-w-3xl mx-auto mb-16 leading-relaxed"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.1)}
      >
        At ClassyShop, your security is our top priority. We use the latest encryption and security technologies to ensure your payment information is always protected.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.2)}
      >
        {/* Encryption */}
        <div className="bg-[#ff5252] text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zM12 14v2m0-6v2m0 6v-2m6-6v6m-12 0v-6m15-1v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h1m8 0h2m2 0h1"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-center">Strong Encryption</h3>
          <p className="text-center text-sm md:text-base">
            All transactions are secured with 256-bit SSL encryption to keep your data safe from unauthorized access.
          </p>
        </div>

        {/* Trusted Payment Gateways */}
        <div className="bg-[#ff5252] text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a5 5 0 00-10 0v2M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-center">Trusted Payment Gateways</h3>
          <p className="text-center text-sm md:text-base">
            We partner with leading payment providers like PayPal, Stripe, and major credit cards to offer you reliable payment options.
          </p>
        </div>

        {/* Fraud Protection */}
        <div className="bg-[#ff5252] text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4-4m0 6v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-center">Fraud Protection</h3>
          <p className="text-center text-sm md:text-base">
            Advanced fraud detection and prevention measures ensure a safe shopping experience every time.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mt-20 max-w-3xl mx-auto text-center text-gray-700 text-base md:text-lg leading-relaxed"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.3)}
      >
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#ff5252' }}>
          How to Pay Securely
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-left">
          <li>Choose your preferred payment method at checkout.</li>
          <li>Ensure your connection is secure (look for the lock icon in your browser).</li>
          <li>Enter your payment details carefully and double-check before submitting.</li>
          <li>Wait for the payment confirmation screen before leaving the page.</li>
          <li>If you face any issues, contact our support immediately at <a href="mailto:support@classyshop.com" className="text-[#ff5252] underline">support@classyshop.com</a>.</li>
        </ol>
      </motion.div>

      <motion.footer
        className="text-center mt-24 text-gray-500 text-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.4)}
      >
        &copy; {new Date().getFullYear()} ClassyShop. All rights reserved.
      </motion.footer>
    </section>
  );
};

export default SecurePayment;
