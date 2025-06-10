import OperationCard from "../components/OperationCard";
import DisplayPlans from "../components/DisplayPlans";
import WhyUsSection from "../components/WhyUsSection";
import Footer from "../components/Footer";
import HowItWorksSection from "../components/HowItWorksSection";
import FAQSection from "../components/FAQSection";
import TrustedBySection from "../components/TrustedBySection";
import HeroBanner from "../components/HeroBanner";
import BorderWrapper from "../components/BorderWrapper";

const Home = () => {
  const operations = [
    {
      title: "Image Format Conversion",
      description: "Convert images to PNG, JPG, or WEBP.",
      route: "/convert",
      icon: "/icons/convert.png",
    },
    {
      title: "Image Compressor",
      description: "Compress image quality to reduce file size.",
      route: "/compress",
      icon: "/icons/compress.png",
    },
    {
      title: "HTML to Image",
      description: "Generate an image from HTML code.",
      route: "/html-to-image",
      icon: "/icons/html.png",
    },
    {
      title: "Rotate Image",
      description: "Rotate image clockwise or counter-clockwise.",
      route: "/rotate",
      icon: "/icons/rotate.png",
    },
    {
      title: "Crop Image",
      description: "Crop images with custom dimensions.",
      route: "/crop",
      icon: "/icons/crop.png",
    },
    {
      title: "Add Watermark",
      description: "Add watermark text on your image.",
      route: "/watermark",
      icon: "/icons/watermark.png",
    },
    {
      title: "Meme Generator",
      description: "Create memes with text and padding.",
      route: "/meme-generator",
      icon: "/icons/meme.png",
    },
    {
      title: "Blur Faces",
      description: "Add blur boxes to hide faces or sensitive areas.",
      route: "/blur-face",
      icon: "/icons/blur.png",
    },
    {
      title: "Image Upscaler",
      description: "Enhance image resolution up to 2× (max 2MB).",
      route: "/upscale",
      icon: "/icons/upscale.png",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <BorderWrapper>
      <div className="p-6">
 

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {operations.map((op) => (
            <OperationCard
              key={op.route}
              title={op.title}
              description={op.description}
              route={op.route}
              icon={op.icon}
              />
            ))}
        </div>
      </div>
</BorderWrapper>
       {/* <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-2">
          Everything you need to edit images — in one place.
        </h2> */}
        {/* <p className="text-center text-black mb-8 text-lg">
        Easily convert PNG, JPG, or other image files to high-quality PDFs or JPGs with our fast, secure, and free online tool. No downloads needed — just upload, convert, and download in seconds!
        </p> */}
        <HowItWorksSection />
      
            <HeroBanner />
        <DisplayPlans />


      <WhyUsSection />
      <TrustedBySection />
        <FAQSection />
      {/* Trusted By Section */}
      <Footer />
    </div>
  );
};

export default Home;
