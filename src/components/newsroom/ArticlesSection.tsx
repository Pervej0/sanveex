import Image from "next/image";

export default function ArticlesSection() {
  const articles = [
    {
      category: "Business",
      date: "August 15, 2019",
      title: "Thousands of Patients Referred to Substance Use Treatment",
      description:
        "Short description goes here to give readers an overview of the article content in 2–3 lines. This will be truncated after 70 characters...",
      img: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop",
    },
    {
      category: "Health",
      date: "August 15, 2019",
      title: "Innovative Healthcare Models Transforming Patient Care",
      description:
        "This article explores modern approaches in healthcare that improve efficiency and patient outcomes. The rest is cut off...",
      img: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-white shadow-sm hover:shadow-md transition rounded-lg overflow-hidden"
            >
              <div className="w-full sm:w-[220px] shrink-0">
                <Image
                  src={item.img}
                  width={220}
                  height={150}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-4 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-foreground-accent">
                      {item.category}
                    </span>{" "}
                    • {item.date}
                  </p>

                  <h6 className="mt-1 text-base font-semibold text-gray-800 hover:text-foreground-accent/20 transition">
                    <a href="#">{item.title}</a>
                  </h6>

                  <p className="mt-2 text-[10px] text-red-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <a
                  href="#"
                  className="text-sm mt-3 inline-block px-4 py-1.5 rounded-md bg-foreground-accent text-white hover:bg-foreground-accent/20 transition w-max"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
