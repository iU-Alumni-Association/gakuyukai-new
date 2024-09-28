import { useState, useEffect } from "react";
import { getBlogs } from "@/lib/microcms";
import type { Blog } from "@/lib/types";
import BlogItem from "@/components/BlogItem";
import BlogHeader from "@/components/BlogHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";

const BlogPage = () => {
  // State for storing blog posts, pagination, and loading status
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * Handle page change event.
   * @param {number} page - The new page number to navigate to.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Fetch blogs from MicroCMS when the component mounts or currentPage changes.
   * It also handles loading state and error handling.
   */
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Show loading indicator
      try {
        const { contents, totalCount } = await getBlogs(currentPage, 10);
        setBlogs(contents);
        setTotalPages(Math.ceil(totalCount / 10)); // Calculate total pages based on totalCount
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <>
      {/* Loading Bar Component */}
      <LoadingBar loading={loading} />

      {/* Meta section */}
      <Meta
        title="iU 学友会 | ブログ"
        description="学友会のブログページです。最新の記事をご覧いただけます。"
        url="https://i-u.io/blog"
      />
      {/* Blog Header */}
      <BlogHeader />
      <Breadcrumbs />

      <div className="container mx-auto py-12 min-h-svh p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">最近の記事</h1>

        {/* Conditional rendering based on loading state */}
        {loading ? (
          <p className="text-center text-gray-600">読み込み中...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {blogs.map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
          </ul>
        )}

        {/* Pagination controls, only render if there are multiple pages */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
                  currentPage === index + 1
                    ? "bg-Thema text-Background"
                    : "bg-Background border-gray-300 text-gray-700 hover:bg-LightThema"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default BlogPage;
