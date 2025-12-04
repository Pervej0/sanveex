"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const products = [
  {
    id: "00m1",
    title: "Medicine No. 1",
    price: "1000 TK",
    dept: "Anesthesiology",
    img: "https://cdn.mimsprd.mims.com/drug-resources/PH/packshot/Prolia6001PPS0.JPG",
  },
  {
    id: "00m2",
    title: "Medicine No. 2",
    price: "1000 TK",
    dept: "Anesthesiology",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png",
  },
  {
    id: "00m3",
    title: "Medicine No. 3",
    price: "1000 TK",
    dept: "Cardiology",
    img: "https://cdn.mimsprd.mims.com/drug-resources/PH/packshot/Prolia6001PPS0.JPG",
  },
  {
    id: "00m4",
    title: "Medicine No. 4",
    price: "1000 TK",
    dept: "Internal Medicine",
    img: "https://cdn.mimsprd.mims.com/drug-resources/TH/packshot/Evrysdi6001PPS0.JPG",
  },
  {
    id: "00m5",
    title: "Medicine No. 5",
    price: "1000 TK",
    dept: "Anesthesiology",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png",
  },
  {
    id: "00m6",
    title: "Medicine No. 6",
    price: "1000 TK",
    dept: "Cardiology",
    img: "https://cdn.mimsprd.mims.com/drug-resources/TH/packshot/Evrysdi6001PPS0.JPG",
  },
];

export default function ProductsSection() {
  return (
    <section className="py-10 md:py-16 mb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((item, i) => (
            <div
              key={i}
              className="rounded-lg shadow-md border border-border bg-white overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="relative group overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-56 group-hover:scale-110 transition duration-500"
                />
                <Link
                  href={`overview/${item.id}`}
                  className="absolute inset-0"
                ></Link>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-foreground">
                    <Link
                      className="text-xl hover:text-primary transition"
                      href={`overview/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <span className="text-sm font-extrabold text-primary">
                    {item.price}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {item.dept}
                </p>

                <div className="mt-4">
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href={`overview/${item.id}`}>Product Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
