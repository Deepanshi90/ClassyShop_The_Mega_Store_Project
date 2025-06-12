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

const LegalNoticePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-white text-gray-900 min-h-screen px-6 py-16 md:py-24 max-w-5xl mx-auto">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-12 text-center"
        style={{ color: '#ff5252' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        Legal Notice
      </motion.h1>

      <motion.div
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.1)}
      >
        <p className="text-lg leading-relaxed text-gray-700">
          Welcome to ClassyShop’s Legal Notice page. Your use of our website and services is
          subject to the following terms and conditions. Please read them carefully before
          proceeding.
        </p>
      </motion.div>

      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.2)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          Ownership and Intellectual Property
        </h2>
        <p className="text-gray-700 leading-relaxed">
          All content on this website, including text, graphics, logos, images, and software,
          is the property of ClassyShop or its content suppliers and is protected by
          international copyright laws. Unauthorized use, reproduction, or distribution of
          this content is prohibited.
        </p>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.3)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          Use of Website
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You agree to use this website only for lawful purposes. Any attempt to
          access unauthorized areas or disrupt the normal operation of the site
          is strictly forbidden.
        </p>
        <p className="mt-2 text-gray-700 leading-relaxed">
          ClassyShop reserves the right to terminate or restrict access to users who
          violate these terms.
        </p>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.4)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          Limitation of Liability
        </h2>
        <p className="text-gray-700 leading-relaxed">
          ClassyShop strives to provide accurate and up-to-date information, but we
          do not guarantee the completeness or accuracy of the content on this website.
        </p>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Under no circumstances shall ClassyShop be liable for any damages arising
          from the use or inability to use this website or any linked third-party sites.
        </p>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.5)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          Privacy Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We respect your privacy. Please review our <a href="/privacy-policy" className="text-red-500 underline">Privacy Policy</a> for information on how we collect,
          use, and protect your personal data.
        </p>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.6)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          Third-Party Links
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our website may contain links to third-party websites for your convenience.
          We do not endorse or control these sites and are not responsible for their content or practices.
        </p>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.7)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          Changes to Legal Notice
        </h2>
        <p className="text-gray-700 leading-relaxed">
          ClassyShop reserves the right to update or modify these terms at any time
          without prior notice. Changes will be posted on this page with the updated
          date. Continued use of the website after changes constitutes acceptance.
        </p>
      </motion.section>

      <motion.section
        className="mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.8)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          Contact Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          For any questions regarding this legal notice, please contact us:
        </p>
        <p className="mt-2 font-semibold" style={{ color: '#ff5252' }}>
          legal@classyshop.com
        </p>
        <p className="text-gray-600 mt-1">Phone: +1 (555) 123-4567</p>
        <p className="text-gray-600 mt-1">Address: 123 ClassyStreet, Suite 100, YourCity, Country</p>
      </motion.section>

      <motion.footer
        className="text-center mt-20 text-gray-500 text-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.9)}
      >
        &copy; {new Date().getFullYear()} ClassyShop. All rights reserved.
      </motion.footer>
    </section>
  );
};

export default LegalNoticePage;
