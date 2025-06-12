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

const TermsAndConditions = () => {
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
        Terms and Conditions
      </motion.h1>

      <motion.div
        className="mb-12 text-lg leading-relaxed text-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.1)}
      >
        <p>
          Welcome to ClassyShop! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>
      </motion.div>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.2)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          1. Use of Website
        </h2>
        <p className="text-gray-700">
          You agree to use the ClassyShop website only for lawful purposes. You must not use the website in any way that could damage, disable, or impair its functionality or interfere with any other party’s use and enjoyment of the site.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.3)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          2. Intellectual Property Rights
        </h2>
        <p className="text-gray-700">
          All content, features, and functionality on this site, including but not limited to text, graphics, logos, images, and software, are owned by ClassyShop or licensed to us, and are protected by international copyright and intellectual property laws.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.4)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          3. User Accounts
        </h2>
        <p className="text-gray-700">
          If you create an account on ClassyShop, you are responsible for maintaining the confidentiality of your login information and for all activities that occur under your account. Please notify us immediately of any unauthorized use.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.5)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          4. Limitation of Liability
        </h2>
        <p className="text-gray-700">
          ClassyShop does not guarantee the accuracy, completeness, or usefulness of any information on the website. To the fullest extent permitted by law, we exclude all liability for any loss or damage arising out of your use or inability to use the website.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.6)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          5. Third-Party Links
        </h2>
        <p className="text-gray-700">
          Our website may contain links to external websites that are not operated by ClassyShop. We have no control over the content or practices of these third-party sites and accept no responsibility for them.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.7)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          6. Changes to Terms
        </h2>
        <p className="text-gray-700">
          We reserve the right to update or modify these Terms and Conditions at any time. All changes will be posted on this page with the updated date. Continued use of our site after changes indicates your acceptance of the updated terms.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.8)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          7. Governing Law
        </h2>
        <p className="text-gray-700">
          These Terms and Conditions shall be governed and construed in accordance with the laws of the jurisdiction in which ClassyShop operates, without regard to its conflict of law provisions.
        </p>
      </motion.section>

      <motion.section
        className="mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.9)}
      >
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#ff5252' }}>
          8. Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions about these Terms and Conditions, please contact us at:
        </p>
        <p className="mt-2 font-semibold" style={{ color: '#ff5252' }}>
          support@classyshop.com
        </p>
        <p className="text-gray-600 mt-1">Phone: +1 (555) 123-4567</p>
        <p className="text-gray-600 mt-1">Address: 123 ClassyStreet, Suite 100, YourCity, Country</p>
      </motion.section>

      <motion.footer
        className="text-center mt-20 text-gray-500 text-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(1)}
      >
        &copy; {new Date().getFullYear()} ClassyShop. All rights reserved.
      </motion.footer>
    </section>
  );
};

export default TermsAndConditions;
