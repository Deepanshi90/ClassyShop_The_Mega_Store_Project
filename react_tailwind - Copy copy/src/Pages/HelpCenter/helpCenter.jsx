import React, { useState, useContext } from "react";
import { MyContext } from "../../App";
import MobileNav from "../../components/Header/Navigation/mobileNav";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order using the tracking ID in the 'My Orders' section under your account.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 7 days of delivery if the product is unused and in original condition.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer:
      "Orders can only be modified within 1 hour of placing them. Contact support for urgent changes.",
  },
  {
    question: "How do I cancel an order?",
    answer:
      "Go to 'My Orders' > select the order > click 'Cancel'. You can only cancel before it’s shipped.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to selected countries. Check our Shipping Policy page for more details.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept Credit/Debit Cards, UPI, PayPal, and Net Banking for a smooth checkout experience.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Fill the form below or email us directly at services@gmail.com. We usually respond within 24 hours.",
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const context = useContext(MyContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Help Center
        </h1>
        <p className="text-center text-gray-500 mb-10 text-lg">
          We’re here to help! Browse our FAQs or reach out directly.
        </p>

        {/* Search Input */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
          />
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-20">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-md bg-white"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center font-medium text-gray-800"
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
                <span className="text-2xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
          {/* Left Panel */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-white/80 backdrop-blur-md"
          >
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              Let’s Connect
            </h2>
            <p className="text-gray-600 mb-6">
              Drop us a line and we’ll get back to you shortly.
            </p>
            <div className="space-y-4 text-gray-700 text-sm">
              <p><strong>📍 Address:</strong> 123 Modern Ave, San Francisco, CA</p>
              <p><strong>✉️ Email:</strong> hello@yourcompany.com</p>
              <p><strong>📞 Phone:</strong> +1 (555) 123-4567</p>
            </div>

            {/* Google Map */}
            <div className="mt-8 rounded-xl overflow-hidden border border-gray-300 shadow-md">
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086582769059!2d-122.41941548468162!3d37.77492977975974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808a3e3b2d3d%3A0x3cb69e5de29724c!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1617995409317!5m2!1sen!2sus"
                className="w-full h-48 border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Right Panel - Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-10 bg-white"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h3>

            <form
              action="https://formsubmit.co/01164be1c7c422e70fae41b051c6d25e"
              method="POST"
              className="space-y-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2"
              ></textarea>

              {/* Hidden Fields */}
              <input
                type="hidden"
                name="_next"
                value={`${BASE_URL}/contact-success`}
              />
              <input type="hidden" name="_template" value="table" />

              <button
                type="submit"
                className="w-full bg-[#ff5252] hover:bg-[#e04343] text-white py-3 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Mobile Nav */}
      {context?.windowWidth < 992 && <MobileNav />}
    </>
  );
};

export default HelpCenter;
