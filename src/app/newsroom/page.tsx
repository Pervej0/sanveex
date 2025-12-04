import ArticlesSection from "@/src/components/newsroom/ArticlesSection";

const NewsRoom = () => {
  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase">
              Read All <span className="text-primary uppercase">Articles</span>
            </h3>
          </div>
        </div>
      </section>
      <ArticlesSection />
    </>
  );
};

export default NewsRoom;
