// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';

// const fadeIn = (delay = 0) => ({
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, delay },
//   },
// });

// const priceDropProducts = [
//   {
//     id: 1,
//     name: 'Classic Leather Bag',
//     originalPrice: 12000,
//     discountedPrice: 8500,
//     image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 2,
//     name: 'Stylish Sunglasses',
//     originalPrice: 6000,
//     discountedPrice: 4500,
//     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 3,
//     name: 'Elegant Watch',
//     originalPrice: 20000,
//     discountedPrice: 15000,
//     image: 'https://images.unsplash.com/photo-1519741494325-c5ef95d0b4bf?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 4,
//     name: 'Casual Sneakers',
//     originalPrice: 9000,
//     discountedPrice: 6500,
//     image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 5,
//     name: 'Wireless Headphones',
//     originalPrice: 15000,
//     discountedPrice: 11000,
//     image: 'https://images.unsplash.com/photo-1512499617640-c2f999019ad9?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 6,
//     name: 'Trendy Jacket',
//     originalPrice: 18000,
//     discountedPrice: 13000,
//     image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
//   },
// ];

// const newProducts = [
//   {
//     id: 101,
//     name: 'Modern Backpack',
//     price: 7500,
//     image: 'https://images.unsplash.com/photo-1562158070-9b0b7f11d7dd?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 102,
//     name: 'Elegant Bracelet',
//     price: 3500,
//     image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 103,
//     name: 'Sports Watch',
//     price: 17000,
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 104,
//     name: 'Running Shoes',
//     price: 8500,
//     image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 105,
//     name: 'Noise Cancelling Earbuds',
//     price: 12000,
//     image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
//   },
//   {
//     id: 106,
//     name: 'Stylish Coat',
//     price: 14000,
//     image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80',
//   },
// ];

// const PriceDrop = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <section className="bg-white min-h-screen py-16 px-6 max-w-7xl mx-auto">
//       {/* Price Drop Header */}
//       <motion.h1
//         className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
//         style={{ color: '#ff5252' }}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn()}
//       >
//         Price Drop Deals at ClassyShop
//       </motion.h1>

//       <motion.p
//         className="text-center max-w-3xl mx-auto mb-16 text-lg text-gray-700"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn(0.1)}
//       >
//         Grab your favorite items at unbeatable prices. Limited time offers, exclusive discounts — only for you!
//       </motion.p>

//       {/* Price Drop Products Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn(0.2)}
//       >
//         {priceDropProducts.map(({ id, name, originalPrice, discountedPrice, image }) => (
//           <motion.div
//             key={id}
//             className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
//             whileHover={{ scale: 1.05 }}
//           >
//             <img
//               src={image}
//               alt={name}
//               className="w-full h-64 object-cover"
//               loading="lazy"
//             />
//             <div className="p-6">
//               <h3 className="text-xl font-semibold mb-2">{name}</h3>
//               <div className="flex items-center space-x-3">
//                 <span className="text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
//                 <span className="text-[#ff5252] font-bold text-lg">₹{discountedPrice.toLocaleString()}</span>
//                 <span className="bg-[#ff5252] text-white text-xs px-2 py-1 rounded uppercase font-semibold">
//                   Save {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* New Products Section */}
//       <motion.h2
//         className="text-3xl md:text-4xl font-bold mt-20 mb-8 text-center"
//         style={{ color: '#ff5252' }}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn(0.3)}
//       >
//         New Arrivals at ClassyShop
//       </motion.h2>

//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn(0.4)}
//       >
//         {newProducts.map(({ id, name, price, image }) => (
//           <motion.div
//             key={id}
//             className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
//             whileHover={{ scale: 1.05 }}
//           >
//             <img
//               src={image}
//               alt={name}
//               className="w-full h-64 object-cover"
//               loading="lazy"
//             />
//             <div className="p-6">
//               <h3 className="text-xl font-semibold mb-2">{name}</h3>
//               <span className="text-[#ff5252] font-bold text-lg">₹{price.toLocaleString()}</span>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       <motion.div
//         className="text-center mt-20 text-gray-600 text-sm md:text-base"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn(0.5)}
//       >
//         Discover the freshest styles and exclusive new products every week at ClassyShop.
//       </motion.div>
//     </section>
//   );
// };

// export default PriceDrop;

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  },
});

const newProducts = [
  {
    id: 101,
    name: 'Modern Backpack',
    price: 7500,
    oldPrice: 9500,
    description: 'Spacious and stylish backpack for everyday use.',
    image: 'https://plus.unsplash.com/premium_photo-1661601775772-1ee5b228cf93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW9kZXJuJTIwQmFja3BhY2t8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 102,
    name: 'Elegant Bracelet',
    price: 3500,
    oldPrice: 4700,
    description: 'Minimalist design bracelet perfect for any occasion.',
    image: 'https://images.unsplash.com/photo-1721103418981-0ee59b80592e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RWxlZ2FudCUyMEJyYWNlbGV0fGVufDB8fDB8fHww',
  },
  {
    id: 103,
    name: 'Sports Watch',
    price: 17000,
    oldPrice: 21000,
    description: 'Waterproof and rugged design with fitness tracking.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 104,
    name: 'Running Shoes',
    price: 8500,
    oldPrice: 9999,
    description: 'Lightweight and breathable shoes for athletes.',
    image: 'https://images.unsplash.com/photo-1469395446868-fb6a048d5ca3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UnVubmluZyUyMFNob2VzfGVufDB8fDB8fHww',
  },
  {
    id: 105,
    name: 'Noise Cancelling Earbuds',
    price: 12000,
    oldPrice: 15000,
    description: 'Immersive sound with industry-leading noise cancellation.',
    image: 'https://images.unsplash.com/photo-1733641839465-f9de0c9b9bde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Tm9pc2UlMjBDYW5jZWxsaW5nJTIwRWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 106,
    name: 'Stylish T-Shirts',
    price: 14000,
    oldPrice: 18000,
    description: 'Premium cotton tees with a modern fit and bold colors.',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80',
  },
];

const NewProducts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {newProducts.map(({ id, name, price, oldPrice, image, description }, index) => {
        const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

        return (
          <motion.div
            key={id}
            className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            variants={fadeIn(index * 0.1)}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
                <Link to="/productListing">
              <h3 className=" link text-xl font-semibold mb-1">{name}</h3>
              </Link>
                <Link to="/productListing">
              <p className="link text-sm text-gray-500 mb-2">{description}</p>
              </Link>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#ff5252] font-bold text-lg">₹{price.toLocaleString()}</span>
                <span className="line-through text-gray-400 text-sm">₹{oldPrice.toLocaleString()}</span>
                <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs font-semibold">
                  -{discount}%
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NewProducts;

