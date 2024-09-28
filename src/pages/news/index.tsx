import { useState, useEffect } from "react";
import { getNews } from "@/lib/microcms";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Link from "next/link";
import LoadingBar from "@/components/LoadingBar";
import type { Blog } from "@/lib/types";
import Meta from "@/components/Meta";

const NewsPage = () => {
  // State variables for news articles, pagination, and loading status
  const [news, setNews] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle page changes for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch news data on component mount and whenever the current page changes
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { contents, totalCount } = await getNews(currentPage, 10); // Fetch 10 news articles per page
        setNews(contents);
        setTotalPages(Math.ceil(totalCount / 10)); // Calculate total number of pages
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  return (
    <>
      <LoadingBar loading={loading} />

      {/* Meta section */}
      <Meta
        title="iU 学友会 | ニュース"
        description="iU 学友会のニュース一覧ページです。最新のニュースをご覧いただけます。"
        url="https://i-u.io/news"
      />

      <Header />
      <Breadcrumbs />
      <div className="container mx-auto py-12 min-h-svh">
        <h2 className="text-h2 sm:text-h2Sm font-bold mb-12 mx-4 ">
          ニュース一覧
        </h2>

        {/* Display a loading message or the news list */}
        {loading ? (
          <p className="text-center text-p sm:text-pSm text-gray-600">
            読み込み中...
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Render each news item */}
            {news.map((item) => (
              <li key={item.id} className="p-4 border-b border-gray-200">
                <Link
                  href={`/news/${item.id}`}
                  className="block hover:underline text-xl font-semibold text-highlight"
                >
                  {item.title}
                </Link>
                <p className="text-p sm:text-pSm text-gray-600">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-p sm:text-pSm line-clamp-3">
                  {
                    item.content.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    ) /* Remove HTML tags from content */
                  }
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
                  currentPage === index + 1
                    ? "bg-highlight text-background" // Active page styling
                    : "bg-background border-gray-300 text-gray-700 hover:bg-secondary" // Inactive page styling
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
