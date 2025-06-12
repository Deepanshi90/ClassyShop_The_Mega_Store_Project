import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const stores = [
  {
    id: 1,
    name: 'Downtown Store',
    logo: 'https://media.istockphoto.com/id/1312051741/photo/shot-of-a-young-women-as-a-fashion-designer-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=HKVpGnIbXybkB0lYH3MWwWC4ojQCm00iFKWugsgj7mY=', // Replace with real logo URL
    brief: 'Located in the heart of the city, offering a wide range of products with excellent customer service.',
    address: '123 Main St, Cityville, Country',
    phone: '+1 555-123-4567',
    email: 'downtown@store.com',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019325151224!2d-122.4194151846819!3d37.774929279758746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d06b92db%3A0xf89a1a37a1e773bb!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus',
  },
  {
    id: 2,
    name: 'Uptown Store',
    logo: 'https://media.istockphoto.com/id/1390983469/photo/portrait-shot-of-happy-medical-shop-owner-standing-with-crossed-arms-by-looking-at-camera-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=UGSgjVLNs3sC5slZ9buCahG3XoXTLiBSDiacIzDXW2o=',
    brief: 'A modern store in the uptown area with exclusive products and promotions.',
    address: '456 Elm St, Cityville, Country',
    phone: '+1 555-987-6543',
    email: 'uptown@store.com',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019325151224!2d-122.4234151846819!3d37.774929279758746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d06b92db%3A0xf89a1a37a1e773cc!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1600000000001!5m2!1sen!2sus',
  },
  {
    id: 3,
    name: 'Suburban Store',
    logo: 'https://media.istockphoto.com/id/1413204314/photo/happy-man-at-supermarket-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=3sOzyYdhm9m6nzAYfJ_ZopRu0Jkva4cXpS1Mv-0FLhk=',
    brief: 'Your friendly neighborhood store with a cozy atmosphere and great deals.',
    address: '789 Oak St, Suburbia, Country',
    phone: '+1 555-246-8101',
    email: 'suburban@store.com',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019325151224!2d-122.4254151846819!3d37.774929279758746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d06b92db%3A0xf89a1a37a1e774dd!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1600000000002!5m2!1sen!2sus',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const StoresPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-14 text-[#ff5252] drop-shadow-lg">
        Our Stores
      </h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stores.map(({ id, name, logo, brief, address, phone, email, mapEmbed }, i) => (
          <motion.div
            key={id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col"
            whileHover={{ scale: 1.03 }}
          >
            {/* Logo and Store Name */}
            <div className="flex items-center space-x-4 p-6 border-b border-gray-100">
              <img
                src={logo}
                alt={`${name} logo`}
                className="w-20 h-20 object-contain rounded-md"
              />
              <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
            </div>

            {/* Brief info */}
            <p className="px-6 py-4 text-gray-700 flex-grow">{brief}</p>

            {/* Contact Info */}
            <div className="px-6 pb-6 space-y-1">
              <p className="text-gray-600">{address}</p>
              <p className="text-gray-600">
                Phone:{' '}
                <a href={`tel:${phone}`} className="text-[#ff5252] hover:underline font-medium">
                  {phone}
                </a>
              </p>
              <p className="text-gray-600 mb-4">
                Email:{' '}
                <a href={`mailto:${email}`} className="text-[#ff5252] hover:underline font-medium">
                  {email}
                </a>
              </p>
            </div>

            {/* Google Map */}
            <div className="w-full h-56 sm:h-64 md:h-48">
              <iframe
                title={`${name} location`}
                src={mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-b-xl"
              ></iframe>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;
