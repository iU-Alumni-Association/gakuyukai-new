import { useState, useEffect } from 'react';
import { getNews } from '@/lib/microcms';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import LoadingBar from '@/components/LoadingBar';
import type { Blog } from '@/lib/types';
import Meta from '@/components/Meta';

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
        console.error('Error fetching news:', error);
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
        title="Kalytero | ニュース"
        description="Kalyteroのニュース一覧ページです。最新のニュースをご覧いただけます。"
        url="https://kalytero.ne.jp/news"
      />

      <Header />
      <div className="container mx-auto py-12 min-h-svh">
        <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">ニュース一覧</h2>

        {/* Display a loading message or the news list */}
        {loading ? (
          <p className="text-center text-gray-600">読み込み中...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Render each news item */}
            {news.map((item) => (
              <li key={item.id} className="p-4 border-b border-gray-200">
                <Link
                  href={`/news/${item.id}`}
                  className="block hover:underline text-xl font-semibold text-customBlue"
                >
                  {item.title}
                </Link>
                <p className="text-gray-600">{new Date(item.date).toLocaleDateString()}</p>
                <p className="mt-2 text-gray-800 line-clamp-3">
                  {item.content.replace(/(<([^>]+)>)/gi, '') /* Remove HTML tags from content */}
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
                    ? 'bg-customBlue text-white' // Active page styling
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100' // Inactive page styling
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
