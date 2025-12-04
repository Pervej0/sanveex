"use client";

import { departments } from "@/src/data/departments";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DepartmentPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState<any>({});

  useEffect(()=>{
    const departmentData = departments.find(item => item.title.toLowerCase() == slug);
    setData(departmentData);
  }, [])

  if (!data) {
    return (
      <div className=\"container mx-auto px-4 py-16 md:py-20\">
        <div className=\"text-center max-w-2xl mx-auto\">
          <h1 className=\"text-3xl md:text-4xl font-semibold text-primary\">Department Not Found</h1>
          <p className=\"text-muted-foreground mt-2\">Please check the department link.</p>
        </div>
      </div>
    );
  }

  return (
    <section className=\"pb-16\">
      {/* 🔹 Banner Section */}
      <div className=\"relative w-full h-[340px] md:h-[420px] rounded-b-3xl overflow-hidden shadow-lg\">
        <Image
          src=\"https://plus.unsplash.com/premium_photo-1757922069810-63945e706fe9\"
          alt={data.title}
          fill
          priority
          className=\"object-cover object-center\"
        />
        {/* Overlay */}
        <div className=\"absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex items-end p-6 md:p-12\">
          <div className=\"container mx-auto px-4\">
            <h1 className=\"text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg\">
              {data.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 🔹 Content Section */}
      <div className=\"container mx-auto px-4 pt-12\">
        <div className=\"max-w-4xl\">
          <p className=\"text-base md:text-lg text-foreground leading-relaxed\">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DepartmentPage;
