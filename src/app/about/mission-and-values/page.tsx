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
          The company has reliably catered to over{" "}
          <span className="font-semibold text-gray-900">
            2 million healthcare professionals and laboratories
          </span>
          , delivering temperature-controlled, premium-quality products. By{" "}
          <span className="font-semibold text-gray-900">2027</span>, it is
          projected to generate a profit of{" "}
          <span className="font-semibold text-gray-900">$264 million</span>{" "}
          while advancing domestic production of critical biotechnology
          products—strengthening the nation’s healthcare infrastructure.
        </p>
      </div>
    </section>
  );
};

export default MissionPage;
