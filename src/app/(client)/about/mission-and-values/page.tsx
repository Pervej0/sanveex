import React from "react";

const MissionPage = () => {
  return (
    <section className="relative py-20 md:py-28">
      <div className="text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-wide uppercase">
          Our <span className="text-primary">Mission</span>
        </h2>

        {/* Divider */}
        <div className="w-24 h-1 bg-primary mx-auto my-6 rounded-full" />

        {/* Mission Text */}
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Our mission is to consistently deliver premium-quality,
          temperature-controlled healthcare products to medical professionals
          and laboratories across the nation. Having reliably served more than{" "}
          <span className="font-semibold text-gray-900">
            two million healthcare professionals and laboratories
          </span>
          , we remain committed to excellence, safety, and innovation. Looking
          ahead to <span className="font-semibold text-gray-900">2027</span>, we
          aim to achieve sustainable growth while strengthening domestic
          production of critical biotechnology products—contributing to a more
          resilient and self-reliant healthcare infrastructure for Bangladesh.
        </p>
      </div>
    </section>
  );
};

export default MissionPage;
