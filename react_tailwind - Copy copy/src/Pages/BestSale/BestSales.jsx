import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Animation for framer-motion
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  },
});

// Best Sales Product List
const bestSalesProducts = [
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



// Chart Data
const salesData = [
  { category: 'Fashion', sales: 120 },
  { category: 'Jewelry', sales: 80 },
  { category: 'Pharma', sales: 95 },
  { category: 'Bags', sales: 60 },
  { category: 'Electronics', sales: 150 },
  { category: 'Footwear', sales: 110 },
  { category: 'Groceries', sales: 130 },
];

// Chart Colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4B5C', '#3C40C6'];

const BestSalesDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-16 p-6 bg-gray-50">
        {/* Charts Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">📊 Sales Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Daily Sales - Bar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3B82F6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Sales Distribution - Pie Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesData}
                  dataKey="sales"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      
      {/* Product Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">🔥 Best Selling Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSalesProducts.map(({ id, name, price, oldPrice, image, description }, index) => {
            const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
            return (
              <motion.div
                key={id}
                variants={fadeIn(index * 0.2)}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-64 object-cover rounded-t-xl"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1">{name}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold text-lg">₹{price.toLocaleString()}</span>
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
      </div>

      
    </div>
  );
};

export default BestSalesDashboard;
