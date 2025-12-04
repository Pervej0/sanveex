import ProductsSection from "@/src/components/products/ProductsSection";
import React from "react";

const page = () => {
  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase">
              BEST <span className="text-primary uppercase">Medicine</span> FOR
              YOU
            </h2>
          </div>
        </div>
      </section>
      <ProductsSection />
    </>
  );
};

export default page;
