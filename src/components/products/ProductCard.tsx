"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, SquareArrowOutUpRight } from "lucide-react";
import { Product } from "@/generated/prisma/client";

export interface ProductCardProps {
  product: Product;
  actions?: React.ReactNode;
}

export default function ProductCard({
  product: {
    name: title,
    description,
    slug,
    image: img,
    links: rawLinks,
    id,
    url,
    genericName,
  },
  actions,
}: ProductCardProps) {
  const links = (rawLinks as any[]) || [];

  const formattedUrl = url
    ? url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`
    : null;

  return (
    <div className="bg-white rounded-lg px-4 sm:px-6 pt-6 pb-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-6">
        <span className="text-sm text-gray-500 truncate max-w-[140px]">
          {url}
        </span>
        <div className="flex items-center gap-2">
          {actions}
          <Link
            href={`${formattedUrl || ""}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <SquareArrowOutUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 sm:w-full h-24 mb-3">
          <Image src={img} alt={title} fill className="object-contain" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
          {title}
        </h3>

        <p className="text-sm sm:text-base font-semibold text-center mt-1">
          {genericName}
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 mt-auto">
        {links?.length > 0 ? (
          links.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="flex gap-3 group/link items-start"
            >
              {item.label.toLowerCase().includes("information") ||
              item.label.toLowerCase().includes("guide") ? (
                <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
              ) : (
                <SquareArrowOutUpRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
              )}
              <span className="text-[15px] text-blue-600 font-medium group-hover/link:underline break-words">
                {item.label}
              </span>
            </Link>
          ))
        ) : (
          <>
            <Link
              href={url || ""}
              className="flex gap-3 group/link items-start"
            >
              <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-[15px] text-blue-600 font-medium group-hover/link:underline">
                Prescribing Information
              </span>
            </Link>

            <Link
              href={url || ""}
              className="flex gap-3 group/link items-start"
            >
              <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-[15px] text-blue-600 font-medium group-hover/link:underline">
                Medication Guide
              </span>
            </Link>

            <Link
              href={url || ""}
              className="flex gap-3 group/link items-start"
            >
              <SquareArrowOutUpRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-[15px] text-blue-600 font-medium break-words group-hover/link:underline">
                For more information for healthcare professionals, visit {url}
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
