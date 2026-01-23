import React from "react";

const SpeechFromBOD = () => {
  return (
    <>
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase mb-10">
              Speech <span className="text-primary">From BOD</span>
            </h2>

            <div className="space-y-8 text-left text-gray-700 leading-relaxed">
              <p>
                Bangladesh has achieved significant progress in the healthcare
                sector over recent years. As members of the Board of Directors,
                we firmly believe that a strong and inclusive healthcare system
                is essential for national development and social well-being. Our
                commitment is to support a healthier Bangladesh through quality
                services, innovation, and responsible leadership.
              </p>

              <p>
                We are dedicated to enhancing healthcare accessibility and
                service standards across the country. By adopting modern
                technology, strengthening professional expertise, and ensuring
                efficient management practices, we aim to meet the evolving
                healthcare needs of both urban and rural populations.
              </p>

              <p>
                Integrity, patient safety, and sustainability remain at the core
                of our operations. We continuously invest in skilled human
                resources and advanced healthcare solutions to deliver reliable,
                affordable, and patient-centered care.
              </p>

              <p>
                With the collective efforts of our management, employees, and
                stakeholders, we look forward to contributing meaningfully to
                the nation’s healthcare journey. We sincerely appreciate the
                trust placed in us and remain committed to serving Bangladesh
                with responsibility and excellence.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="font-bold text-lg text-primary">
                  Md. Golam Mortuza Menon
                </h4>
                <p className="text-sm text-gray-600">Managing Director & CEO</p>
              </div>

              <div>
                <h4 className="font-bold text-lg text-primary">
                  Md. Abdur Rahaman Miah
                </h4>
                <p className="text-sm text-gray-600">
                  Deputy Managing Director
                </p>
                <p className="text-sm text-gray-600">Sales & Marketing</p>
              </div>

              <div>
                <h4 className="font-bold text-lg text-primary">
                  Masnad Ali Mihad
                </h4>
                <p className="text-sm text-gray-600">
                  Deputy Managing Director
                </p>
                <p className="text-sm text-gray-600">
                  Finance & Administration
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpeechFromBOD;
