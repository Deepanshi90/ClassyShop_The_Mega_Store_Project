import React from "react";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom"
const ContactUs = () => {
    // const history = useNavigate();
     const BASE_URL = import.meta.env.VITE_BASE_URL; // Vite users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT PANEL - LIGHTER LOOK */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/80 backdrop-blur-md p-8 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Let's Connect</h2>
            <p className="text-gray-600 mb-6">
              Drop us a line and we’ll get back to you shortly.
            </p>
            <div className="space-y-4 text-sm text-gray-700">
              <p><strong>📍 Address:</strong> 123 Modern Ave, San Francisco, CA</p>
              <p><strong>✉️ Email:</strong> hello@yourcompany.com</p>
              <p><strong>📞 Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>

          {/* MAP */}
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

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-10 bg-white"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
         

          <form
  action="https://formsubmit.co/01164be1c7c422e70fae41b051c6d25e"
  method="POST"
  className="space-y-5"
>
  <div>
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2"
    />
  </div>
  <div>
    <input
      type="email"
      name="email"
      placeholder="Your Email"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2"
    />
  </div>
  <div>
    <input
      type="text"
      name="subject"
      placeholder="Subject"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2"
    />
  </div>
  <div>
    <textarea
      name="message"
      rows="4"
      placeholder="Your Message"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2"
    ></textarea>
  </div>

  {/* Hidden Fields */}
  {/* <input type="hidden" name="_captcha" value="false" /> */}
  <input type="hidden" name="_next"  value={`${BASE_URL}/contact-success`}/>
  {/* <input type="hidden" name="_cc" value="another@email.com,yetanother@email.com"></input> */}
  {/* <input type="hidden" name="_next" value="https://yourdomain.co/thanks.html"></input> */}
  <input type="hidden" name="_template" value="box"></input>

  <button
    type="submit"
    className="w-full bg-[#ff5252] hover:bg-[rgba(255,82,82,0.97)] text-white py-3 rounded-xl font-semibold transition cursor-pointer"
  >
    Send Message
  </button>
</form>

        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
