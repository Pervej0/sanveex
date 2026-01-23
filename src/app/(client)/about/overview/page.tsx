import React from "react";

const Page = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-8 text-center">
          About Sanveex
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          <span className="font-semibold text-gray-900">Sanveex</span> is
          founded and driven by a team of dedicated professionals with extensive
          experience across multinational and leading local pharmaceutical
          organizations. With strong expertise in product management, brand
          strategy, and market development, the team has strategically planned
          and executed initiatives to build an organization focused on
          delivering meaningful and sustainable impact within the healthcare
          sector.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Our leadership comprises seasoned professionals from the
          pharmaceutical and MedTech industries, uniquely positioned to address
          complex healthcare challenges through innovative, practical, and
          patient-focused solutions. Within a short period, Sanveex has
          successfully developed a growing portfolio of healthcare products
          designed to enhance patient outcomes and support clinical excellence.
        </p>

        {/* Expertise */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Our Expertise
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Sanveex specializes in strategic healthcare marketing, new product
          launches, and the development of biotechnology and bone health
          portfolios. Our operational strength lies in territory-based
          management, data-driven planning, and customer-centric execution. This
          expertise is supported by a strong academic foundation in
          Pharmaceutical Sciences and reinforced through continuous professional
          training, both locally and internationally.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Our core competencies span advanced molecular pharmacology, clinical
          pharmacy, pharmaceutical manufacturing, quality control, and quality
          assurance—ensuring that all healthcare solutions meet international
          quality standards while remaining locally relevant.
        </p>

        {/* Innovation */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Innovation & Digital Transformation
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          We recognize the growing importance of digitalization and AI-guided
          environments in modern healthcare. Sanveex believes that the
          modernization of healthcare and education systems is essential for
          long-term progress. We actively support the thoughtful integration of
          technology, data-driven insights, and personalized digital solutions
          to enable smarter and more effective decision-making.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          In addition, Sanveex provides research-oriented management
          consultation and market analysis services, supporting evidence-based
          strategies across the healthcare ecosystem.
        </p>

        {/* Nation Building */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Nation-Building & Research
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Beyond core pharmaceutical activities, Sanveex is committed to
          responsible business diversification and long-term nation-building
          initiatives. Through affiliated efforts such as{" "}
          <span className="font-semibold text-gray-900">
            Education for the Nation
          </span>
          , we actively contribute to knowledge development, professional
          capacity building, and academic advancement in Bangladesh.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Sanveex is supported by a network of leading consultants, physicians,
          and academic collaborators. We are actively involved in research
          initiatives, including the study titled{" "}
          <em className="italic">
            “Current Scenario of Osteoporosis in Bangladesh”
          </em>
          , which aims to be among the first comprehensive publications
          addressing this critical public health issue from the country.
        </p>

        {/* Commitment */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Our Commitment
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Through our work and collaborations, we have gained deep insight into
          Bangladesh’s healthcare landscape and its evolving needs. We value the
          guidance of scholars, clinicians, and healthcare leaders as we
          continue to contribute toward building a stronger, more resilient
          healthcare environment for the nation.
        </p>

        {/* Closing */}
        <p className="text-center text-xl font-semibold text-primary">
          Sanveex represents global quality, driven by a strong and responsible
          local presence.
        </p>
      </div>
    </section>
  );
};

export default Page;
