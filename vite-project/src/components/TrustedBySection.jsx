import React from "react";

const TrustedBySection = () => {
  return (
    <section className="w-full py-16 bg-indigo-900 flex flex-col items-center">
      <div className="w-full max-w-4xl text-center px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold  text-teal-600 dark:text-teal-400 mb-4">
          The image editor trusted by thousands of users
        </h2>
        <p className="text-white mb-10 text-base md:text-lg">
          ImagePivot is your all-in-one web app for editing images with ease. Enjoy all the tools you need to work efficiently and securely—your data is always private.
        </p>
        <div className="flex justify-center items-center space-x-10 mt-8">
          {/* Example trust icons (replace with your own if needed) */}
          <div className="flex flex-col items-center">
            <svg className="h-10 w-10 text-teal-300 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-white">ISO 27001</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="h-10 w-10 text-teal-300 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-white">Secure Processing</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="h-10 w-10 text-teal-300 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2l9 4-9 16-9-16 9-4z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-xs text-white">Image Association</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection; 