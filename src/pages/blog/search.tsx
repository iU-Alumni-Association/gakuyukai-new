import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getBlogsByQuery } from '@/lib/microcms';
import type { Blog } from '@/lib/types';
import BlogItem from '@/components/BlogItem';
import NoResults from '@/components/NoResults';
import BlogHeader from '@/components/BlogHeader';
import Footer from '@/components/Footer';
import LoadingBar from '@/components/LoadingBar';
import Meta from '@/components/Meta';

/**
 * SearchPage component handles displaying the results of a blog search query.
 * It fetches blog posts based on the query from the router's query parameters.
 */
const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;

  // State variables to store blogs, loading status, and pagination
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /**
   * Fetch blogs based on the current query and page.
   * This effect is triggered whenever the query or currentPage changes.
   */
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const { contents, totalCount } = await getBlogsByQuery(query as string, currentPage);
        setBlogs(contents);
        setTotalPages(Math.ceil(totalCount / 10)); // Calculate total pages based on 10 items per page
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [query, currentPage]);

  /**
   * Handle page change event.
   * @param {number} page - The new page number to navigate to.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Meta section */}
      <Meta
        title="Kalytero | ブログ検索"
        description="Kalyteroのブログ検索ページです。お探しの記事を検索してご覧いただけます。"
        url="https://kalytero.ne.jp/search"
      />
      <BlogHeader />

      <div className="container mx-auto py-12 min-h-svh p-4">
        {/* Display loading bar */}
        <LoadingBar loading={loading} />

        {/* Search results header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">検索結果: {query}</h1>

        {/* Main content: display either loading, no results, or list of blogs */}
        {loading ? (
          <p className="text-center text-gray-600">読み込み中...</p>
        ) : blogs.length === 0 ? (
          <NoResults query={query as string} />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {blogs.map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
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
                    ? 'bg-customBlue text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
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

export default SearchPage;
