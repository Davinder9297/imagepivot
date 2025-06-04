import React from "react";

const HowItWorksSection = () => {
  return (
    <div className="w-full bg-gray-100 py-16 flex justify-center">
      <div className="flex flex-col md:flex-row items-center max-w-4xl w-full mx-auto p-8 bg-[#F4EDE4]  rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
        {/* Illustration/Image */}
        <div className="flex-shrink-0 flex justify-center w-full md:w-auto mb-8 md:mb-0 md:mr-16">
          <img
            src="/image1.jpg"
            alt="How to convert"
            className="w-56 h-56 object-contain"
          />
        </div>
        {/* Text Content */}
        <div className="flex-1  text-left">
          <h3 className="text-2xl font-bold  text-teal-600 mb-3">How to convert PDF to Word</h3>
          <p className="text-black font-semibold mb-4">
            Follow these simple steps to convert a PDF to Word using Xodo:
          </p>
          <ol className="list-decimal list-inside text-gray-800 space-y-2 font-medium text-base">
            <li>Upload your PDF to the free online PDF to Word converter.</li>
            <li>Click "Convert" – OCR is automatically applied to scanned PDFs.</li>
            <li>Download your editable Word (.docx) file.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection; 