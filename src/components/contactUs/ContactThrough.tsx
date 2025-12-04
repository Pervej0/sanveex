"use client";

import { PhoneCall, MapPin, Mail, CalendarDays } from "lucide-react";

export default function ContactThrough() {
  const contactItems = [
    {
      icon: <PhoneCall className="w-8 h-8 text-blue-600" />,
      text1: "Emergency Cases",
      text2: "(+880) 611-5711",
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      text1: "Dhaka",
      text2: "Bangladesh",
    },
    {
      icon: <Mail className="w-8 h-8 text-pink-600" />,
      text1: "Email Address",
      text2: "info@sanveex.com",
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-purple-600" />,
      text1: "Contact With Us",
      text2: "(+880) 1997 169 29",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border border-border"
            >
              {item.icon}
              <p className="text-center text-foreground text-sm">
                <span className="font-semibold block">{item.text1}</span>
                <span className="text-muted-foreground">{item.text2}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
