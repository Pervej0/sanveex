import ArticlesSection from "@/src/components/newsroom/ArticlesSection";

const NewsRoom = () => {
  return (
    <>
      <div className="text-center container pt-20 mb-12">
        <h3 className="text-3xl uppercase md:text-5xl font-bold text-gray-800">
          Read All Articles
        </h3>
      </div>
      <ArticlesSection />
    </>
  );
};

export default NewsRoom;
