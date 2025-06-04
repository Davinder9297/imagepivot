import OperationCard from "../components/OperationCard";
import DisplayPlans from "../components/DisplayPlans";
import WhyUsSection from "../components/WhyUsSection";
import Footer from "../components/Footer";
import HowItWorksSection from "../components/HowItWorksSection";
import FAQSection from "../components/FAQSection";
import TrustedBySection from "../components/TrustedBySection";
import HeroBanner from "../components/HeroBanner";

const PreHome = () => {
  const operations = [
    {
      title: "Image Operation",
      description: "Convert images to PNG, JPG, or WEBP.",
      route: "/image",
      icon: "/icons/convert.png",
    },
    {
      title: "Audio Conversion",
      description: "Convert audio to wav, aiff, pcm, mp3, aac, ogg, flac, alac, m4a, opus, amr",
      route: "/convertaudio",
      icon: "/icons/upscale.png",
    },
    {
      title: "Video Conversion",
      description: "Convert video to mp4, mkv, webm, avi, mov, flv",
      route: "/convertvideo",
      icon: "/icons/upscale.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-2">
          Everything you need to edit images — in one place.
        </h2>
        <p className="text-center text-black mb-8 text-lg">
        Easily convert PNG, JPG, or other image files to high-quality PDFs or JPGs with our fast, secure, and free online tool. No downloads needed — just upload, convert, and download in seconds!
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border">
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

export default PreHome;