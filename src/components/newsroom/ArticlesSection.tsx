import Image from "next/image";
import Link from "next/link";

export default function ArticlesSection() {
  const articles = [
    {
      id: "00001",
      category: "Business",
      date: "August 15, 2019",
      title: "Thousands of Patients Referred to Substance Use Treatment",
      description:
        "Thousands of patients have been referred to substance use treatment programs in recent years as awareness about addiction continues to grow. Many healthcare centers are now prioritizing early diagnosis, counseling support, and long-term rehabilitation strategies to help individuals recover and reintegrate into society with improved mental and physical stability.",
      img: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop",
    },
    {
      id: "00002",
      category: "Health",
      date: "August 15, 2019",
      title: "Innovative Healthcare Models Transforming Patient Care",
      description:
        "Innovative healthcare models are transforming patient care through technology-driven solutions, early diagnostics, and personalized treatment plans. Hospitals and clinics are adopting digital health platforms, remote monitoring, and data analytics to increase efficiency, reduce patient costs, and improve overall treatment outcomes across different medical fields.",
      img: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((item) => (
            <div
              key={item.id}
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
                  <p className="text-gray-500">
                    <span className="text-sm font-semibold text-foreground-accent">
                      {item.category}
                    </span>{" "}
                    • <span className="text-sm">{item.date}</span>
                  </p>

                  <h6 className="mt-1 text-base font-semibold text-gray-800 hover:text-foreground-accent/20 transition">
                    <a href="#">{item.title}</a>
                  </h6>

                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <Link
                  href={`newsroom/${item.id}`}
                  className="text-sm mt-3 inline-block px-4 py-1.5 rounded-md bg-foreground-accent text-white hover:bg-foreground-accent/20 transition w-max"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
