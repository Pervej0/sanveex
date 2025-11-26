import ProductsSection from "@/src/components/products/ProductsSection";
import React from "react";

const page = () => {
  return (
    <>
      <section className="text-center my-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
          BEST{" "}
          <span className="text-foreground-accent uppercase">Medicine</span> FOR
          YOU
        </h2>
      </section>
      <ProductsSection />
    </>
  );
};

export default page;
