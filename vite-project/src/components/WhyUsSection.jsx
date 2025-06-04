const WhyUsSection = () => {
  const features = [
    {
      title: "All-in-One Image Toolkit",
      description:
        "Convert, crop, rotate, blur faces, add watermarks, or generate memes — all in one simple platform.",
    },
    {
      title: "Bulk Image Processing",
      description:
        "Save time with batch operations — convert formats, enhance quality, or compress multiple images at once.",
    },
    {
      title: "Edit Your Way",
      description:
        "From resizing to enhancing, tweak every image manually with ease — no fluff, just features.",
    },
  ];

  return (
    <section className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-600 mb-16">
          IMAGEPivot, Your all-in-one image editor.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center px-4">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
