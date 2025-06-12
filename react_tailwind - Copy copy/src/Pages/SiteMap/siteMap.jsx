import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBoxOpen, FaListAlt, FaQuestionCircle, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

const SiteMapPage = () => {
  const siteStructure = [
    {
      section: 'Main Pages',
      icon: <FaHome className="text-blue-600 text-xl mr-2" />,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/productListing' },
        { name: 'About Us', path: '/aboutUs' },
        { name: 'Contact', path: '/contactUs' },
      ],
    },
    {
      section: 'My Account',
      icon: <FaUser className="text-green-600 text-xl mr-2" />,
      links: [
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
        { name: 'My Profile', path: '/my-account' },
        { name: 'My Orders', path: '/my-orders' },
      ],
    },
    {
      section: 'Categories',
      icon: <FaBoxOpen className="text-orange-500 text-xl mr-2" />,
      links: [
        { name: 'Fashion', path: '/productListing' },
        { name: 'Jewelry', path: '/productListing' },
        { name: 'Electronics', path: '/productListing' },
        { name: 'Groceries', path: '/productListing' },
        { name: 'Footwear', path: '/productListing' },
        { name: 'Bags', path: '/productListing' },
        { name: 'Pharma', path: '/productListing' },
      ],
    },
    {
      section: 'Help & Legal',
      icon: <FaInfoCircle className="text-purple-600 text-xl mr-2" />,
      links: [
        { name: 'Delivery', path: '/delivery' },
        { name: 'Terms of Service', path: '/condition' },
        { name: 'Legal Notice', path: '/legal' },
        { name: 'Site Map', path: '/sitemap' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">🗺️ Explore Our Site</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {siteStructure.map((section, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <div className="flex items-center mb-4">
              {section.icon}
              <h2 className="text-lg font-semibold text-gray-700">{section.section}</h2>
            </div>
            <ul className="space-y-2 pl-2">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 hover:underline transition"
                  >
                    ➤ {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteMapPage;
