import React, { useState } from "react";

const faqs = [
  {
    question: "How do I convert an image to another format?",
    answer:
      "Go to the Convert tool, upload your image, select the desired output format (JPG, PNG, WEBP), and click Convert. Download your converted image instantly.",
  },
  {
    question: "Is there a limit to the number of images I can process?",
    answer:
      "Free users have a limited number of conversions per month. Upgrade to a paid plan for higher or unlimited usage.",
  },
  {
    question: "Are my images safe and private?",
    answer:
      "Yes, all images are processed securely and deleted automatically after a short period. Your privacy is our priority.",
  },
  {
    question: "Can I use ImagePivot on mobile?",
    answer:
      "Yes! ImagePivot is fully responsive and works on all modern mobile browsers.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG, PNG, WEBP, and more for both input and output. Check each tool for specific format support.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full py-16 bg-[#F4EDE4] flex flex-col items-center ">
      <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">ImagePivot FAQ</h2>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow border border-gray-200 divide-y divide-gray-200">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <button
              className={`w-full text-left px-6 py-4  flex justify-between items-center focus:outline-none transition-colors ${
                openIndex === idx ? 'bg-gray-100' : 'bg-gray-300'
              }`}
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            >
              <span className="text-gray-800 font-semibold">{faq.question}</span>
              <span className={`ml-4 transition-transform text-gray-800 ${openIndex === idx ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 pt-2 text-gray-700 animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 