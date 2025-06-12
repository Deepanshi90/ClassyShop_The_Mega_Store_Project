import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, delay },
  },
});

const fadeImage = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3.5 } }, // ⬅️ increased duration
  exit: { opacity: 0, transition: { duration: 3.5 } },
};


const journeyImages = [
//   'https://images.unsplash.com/photo-1581091870622-2d60b3c8313b?auto=format&fit=crop&w=800&q=80',
'https://plus.unsplash.com/premium_photo-1726711234495-92966b568e13?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
//   'https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=800&q=80',
];

const bannerImages = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
//   'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
"https://images.unsplash.com/photo-1632910121591-29e2484c0259?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const teamMembers = [
  {
    name: 'Aryan Kapoor',
    role: 'Frontend Developer',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Simran Kaur',
    role: 'UI/UX Designer',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Raj Mehta',
    role: 'Backend Engineer',
    img: 'https://randomuser.me/api/portraits/men/58.jpg',
  },
];


const AboutUsSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % journeyImages.length);
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

   const [currentImage2, setCurrentImage2] = useState(0);

  // Auto-change banner image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage2((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // ⬅️ scrolls to the top when the component mounts
  }, []);

  return (
    <section className="bg-white text-gray-800">
      {/* Hero Intro */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <h1 className="text-5xl font-bold mb-4">Who We Are</h1>
        <p className="text-xl text-gray-600">
          We’re not just an e-commerce platform—we’re a passionate team reshaping the way you shop online.
        </p>
      </motion.div>

      {/* Story Section with Image Carousel */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          {/* Image Carousel */}
          <motion.div
            className="md:w-1/2 w-full h-[300px] md:h-[400px] relative overflow-hidden rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0.1)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={journeyImages[currentImage]}
                src={journeyImages[currentImage]}
                alt="Our Journey"
                variants={fadeImage}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full h-full object-cover rounded-lg"
              />
            </AnimatePresence>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0.2)}
          >
            <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
            <p className="text-lg mb-4">
              Founded by innovators and tech enthusiasts, our e-commerce platform was built to eliminate the friction in online shopping.
            </p>
            <p className="text-lg">
              With a full-stack architecture, smart recommendations, and real-time tracking, we aim to build lasting relationships—not just transactions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission and Values */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          Our Mission & Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: 'Customer First',
              desc: 'Everything we do starts with you. Your feedback shapes our vision.',
            },
            {
              title: 'Innovation',
              desc: 'AI, multilingual support, automation—we build what solves problems.',
            },
            {
              title: 'Integrity',
              desc: 'Transparency and trust are at our core. Always.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-8 shadow-md rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(index * 0.2)}
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}

  <motion.div
      className="bg-gray-50 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn(0.2)}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet the People Behind the Platform</h2>
        <p className="text-gray-600 mb-10">
          Behind every great feature is a passionate team of developers, designers, and dreamers.
        </p>

        {/* Animated Image Banner */}
        <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-12 shadow-lg">
          <AnimatePresence>
            <motion.img
              key={bannerImages[currentImage]}
              src={bannerImages[currentImage]}
              alt="Team"
              className="w-full h-full object-cover absolute top-0 left-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(idx * 0.2)}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-100"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
    
    </section>
  );
};

export default AboutUsSection;
