import React, { useState } from "react";
import MobileNav from "../../components/Header/Navigation/mobileNav";
import { MyContext } from "../../App";

const faqData = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order using the tracking ID in the 'My Orders' section under your account.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 7 days of delivery if the product is unused and in original condition.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer:
      "Orders can only be modified within 1 hour of placing them. Contact support for urgent changes.",
  },
  {
    question: "How do I cancel an order?",
    answer:
      "Go to 'My Orders' > select the order > click 'Cancel'. You can only cancel before it’s shipped.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to selected countries. Check our Shipping Policy page for more details.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept Credit/Debit Cards, UPI, PayPal, and Net Banking for a smooth checkout experience.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Fill the form below or email us directly at services@gmail.com. We usually respond within 24 hours.",
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const context = useState(MyContext)

  return (
  <>
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Help Center
      </h1>
      <p className="text-center text-gray-500 mb-8 text-lg">
        We're here to help! Browse FAQs or reach out to us directly.
      </p>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search help articles..."
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4 mb-12">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm"
          >
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center font-medium text-gray-800"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600">{item.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Still need help? Contact us.
        </h2>
        <form
          action="https://formsubmit.co/services@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Describe your issue..."
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none resize-none"
          ></textarea>

          {/* Hidden form submit config */}
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://your-ecommerce-site.com/help/success"
          />

          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>


      {/* <form
  action="https://formsubmit.co/services@gmail.com"
  method="POST"
  className="space-y-4"
>
  <input type="text" name="name" placeholder="Your Full Name" required className="..." />
  <input type="email" name="email" placeholder="Your Email" required className="..." />
  <textarea name="message" rows="5" placeholder="Describe your issue..." required className="..." /> */}

  {/* Formsubmit config */}
  {/* <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_next" value="http://localhost:3000/help/success" />

  <button type="submit" className="...">Send Message</button>
</form> */}
    </div>

    {
  context?.windowWidth <992 &&  <MobileNav />
}
  </>
  );
};

export default HelpCenter;

