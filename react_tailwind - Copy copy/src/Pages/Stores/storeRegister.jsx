// import React, { useState } from 'react';

// const StoreRegistration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     logoUrl: '',
//     brief: '',
//     address: '',
//     phone: '',
//     email: '',
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Here you will POST formData to your backend API
//     // For now, simulate submission
//     console.log('Store Registration submitted:', formData);

//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10 text-center">
//         <h2 className="text-2xl font-bold mb-4 text-[#ff5252]">Thank you!</h2>
//         <p>Your store registration request has been submitted and is awaiting admin approval.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
//       <h1 className="text-3xl font-extrabold mb-6 text-center text-[#ff5252]">Register Your Store</h1>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block mb-1 font-medium">Store Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Logo URL (image link)</label>
//           <input
//             type="url"
//             name="logoUrl"
//             value={formData.logoUrl}
//             onChange={handleChange}
//             placeholder="https://example.com/logo.png"
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Brief Description</label>
//           <textarea
//             name="brief"
//             value={formData.brief}
//             onChange={handleChange}
//             rows={3}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           ></textarea>
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#ff5252] text-white py-3 rounded font-semibold hover:bg-[#e04e4e] transition"
//         >
//           Submit Registration
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StoreRegistration;


import React, { useEffect } from "react";
import { motion } from "framer-motion";

const StoreRegistration = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md p-8 md:p-10 flex flex-col justify-center"
        >
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Register Your Store</h2>
            <p className="text-gray-600 mb-6">Fill out the details below to get your store listed. Our admin will verify and get back to you shortly.</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>🔐 Secure Process</strong> – All submissions go directly to our admin.</li>
              <li><strong>📩 Email Confirmation</strong> – You’ll receive a confirmation instantly.</li>
              <li><strong>🕒 Quick Review</strong> – Our team will respond within 24–48 hours.</li>
            </ul>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-10 bg-white"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Store Registration Form</h3>
          <form
            action="https://formsubmit.co/01164be1c7c422e70fae41b051c6d25e"  // <-- Replace with your admin email
            method="POST"
            className="space-y-5"
          >
            <input
              type="text"
              name="owner_name"
              placeholder="Owner's Full Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="brand_name"
              placeholder="Store / Brand Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Contact Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="location"
              placeholder="Store Location / Address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              name="description"
              rows="4"
              placeholder="Brief Description About the Store"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-green-400"
            ></textarea>

            {/* Email Routing Settings */}
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_next" value={`${BASE_URL}/store-confirmation`} />
            <input type="hidden" name="_autoresponse" value="Thank you for registering your store! Our admin team will verify your submission and contact you shortly." />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition 
              duration-300 ease-in-out cursor-pointer"
            >
              Submit Registration
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default StoreRegistration;
