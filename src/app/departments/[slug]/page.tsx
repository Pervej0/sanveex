"use client";

import { departments } from "@/src/data/departments";
import Image from "next/image";
import { useParams } from "next/navigation";

const DepartmentPage = () => {
  const { slug } = useParams();

  const data = departments.find((item) => item.title.toLowerCase() == slug);

  if (!data) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-semibold">Department Not Found</h1>
        <p className="text-gray-600 mt-2">Please check the department link.</p>
      </div>
    );
  }

  return (
    <section className="pb-16">
      {/* 🔹 Banner Section */}
      <div className="relative w-full h-[340px] md:h-[420px] rounded-b-3xl overflow-hidden shadow-lg">
        <Image
          src="https://plus.unsplash.com/premium_photo-1757922069810-63945e706fe9"
          alt={data.title}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex items-end p-8 md:p-12">
          <h1 className=" container text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            {data.title}
          </h1>
        </div>
      </div>

      {/* 🔹 Content Section */}
      <div className="container pt-12">
        <div className="max-w-4xl">
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DepartmentPage;
