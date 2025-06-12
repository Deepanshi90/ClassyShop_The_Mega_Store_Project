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

const products = [
  {
    id: 1,
    name: 'Classic Leather Bag',
    originalPrice: 12000,
    discountedPrice: 8500,
    image: 'https://images.unsplash.com/photo-1657603513821-399e205022cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENsYXNzaWMlMjBMZWF0aGVyJTIwQmFnfGVufDB8fDB8fHww',
  },
  {
    id: 2,
    name: 'Stylish Sunglasses',
    originalPrice: 6000,
    discountedPrice: 4500,
    image: 'https://images.unsplash.com/photo-1523754865311-b886113bb8de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3R5bGlzaCUyMFN1bmdsYXNzZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'Elegant Watch',
    originalPrice: 20000,
    discountedPrice: 15000,
    image: 'https://images.unsplash.com/photo-1528739964081-51ad930e29c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RWxlZ2FudCUyMFdhdGNofGVufDB8fDB8fHww',
  },
  {
    id: 4,
    name: 'Casual Sneakers',
    originalPrice: 9000,
    discountedPrice: 6500,
    image: 'https://images.unsplash.com/photo-1542272606-405060e9517f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FzdWFsJTIwU25lYWtlcnN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 5,
    name: 'Wireless Headphones',
    originalPrice: 15000,
    discountedPrice: 11000,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2lyZWxlc3MlMjBIZWFkcGhvbmVzfGVufDB8fDB8fHww',
  },
  {
    id: 6,
    name: 'Trendy Jacket',
    originalPrice: 18000,
    discountedPrice: 13000,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VHJlbmR5JTIwSmFja2V0fGVufDB8fDB8fHww',
  },
];

const PriceDrop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-white min-h-screen py-16 px-6 max-w-7xl mx-auto">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
        style={{ color: '#ff5252' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        Price Drop Deals at ClassyShop
      </motion.h1>

      <motion.p
        className="text-center max-w-3xl mx-auto mb-16 text-lg text-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.1)}
      >
        Grab your favorite items at unbeatable prices. Limited time offers, exclusive discounts — only for you!
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.2)}
      >
        {products.map(({ id, name, originalPrice, discountedPrice, image }) => (
          <motion.div
            key={id}
            className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{name}</h3>
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                <span className="text-[#ff5252] font-bold text-lg">₹{discountedPrice.toLocaleString()}</span>
                <span className="bg-[#ff5252] text-white text-xs px-2 py-1 rounded uppercase font-semibold">
                  Save {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-20 text-gray-600 text-sm md:text-base"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.3)}
      >
        Hurry! These deals won't last long. Shop now and enjoy classy savings with ClassyShop.
      </motion.div>
    </section>
  );
};

export default PriceDrop;
