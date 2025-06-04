import React from "react";

const HeroBanner = () => {
  return (
    <section className="w-full bg-[#F4EDE4]  py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4">
        {/* Left: Text and CTA */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Fast, Secure & <span className="text-teal-600">Powerful</span> <br />
            <span className="text-teal-600">Image Editing Online</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Edit, convert, compress, and enhance your images with ease. Trusted by thousands. Start your project now!
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center md:justify-start">
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-10 h-10" />
              <span className="text-green-600 font-medium">Live Chat</span>
            </a>
          </div>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src="/image2.jpg"
            alt="Image editing illustration"
            className="w-80 h-80 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner; 