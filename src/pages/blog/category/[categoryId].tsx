import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getBlogsByCategory,
  getCategory,
} from '@/lib/microcms';
import type { Blog, Category } from '@/lib/types';
import BlogItem from '@/components/BlogItem';
import NoResults from '@/components/NoResults';
import BlogHeader from '@/components/BlogHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import LoadingBar from '@/components/LoadingBar';
import Meta from '@/components/Meta';

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  // State management for category, blogs, pagination, and loading
  const [category, setCategory] =
    useState<Category | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] =
    useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle pagination page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch category and blogs when categoryId or page changes
  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryAndBlogs = async () => {
      setLoading(true);
      try {
        const categoryData = await getCategory(
          categoryId as string,
        );
        setCategory(categoryData);

        const { contents, totalCount } =
          await getBlogsByCategory(
            categoryId as string,
            currentPage,
            10,
          );
        setBlogs(contents);
        setTotalPages(Math.ceil(totalCount / 10));
      } catch (error) {
        console.error(
          'Error fetching category and blogs:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndBlogs();
  }, [categoryId, currentPage]);

  return (
    <>
      {/* Loading bar for visual feedback */}
      <LoadingBar loading={loading} />

      {/* Meta section */}
      <Meta
        title="i-u.io | ブログカテゴリー"
        description="i-u.ioのブログカテゴリーページです。"
        url="https://i-u.io/blog/category"
      />

      {/* Blog header component */}
      <BlogHeader />
      <Breadcrumbs />

      <div className="container mx-auto min-h-svh p-4 pb-12">
        {/* Category title */}
        <h1 className="text-brand mb-8 text-h1 font-bold sm:text-h1Sm">
          {category ? category.name : ''}
        </h1>

        {/* Category description and image, if available */}
        {category &&
          (category.explanation ||
            category.image) && (
            <div className="mb-8 flex flex-col items-center text-center">
              {category.explanation && (
                <p className="mb-4 max-w-2xl text-paragraph sm:text-pSm">
                  {category.explanation}
                </p>
              )}
              {category.image && (
                <div className="w-full max-w-md">
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className="h-auto w-full"
                  />
                </div>
              )}
            </div>
          )}

        {/* Blog posts list or no results message */}
        {blogs.length === 0 ?
          <NoResults
            query={
              category ?
                category.name
              : 'このカテゴリ'
            }
          />
        : <ul className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogItem
                key={blog.id}
                blog={blog}
              />
            ))}
          </ul>
        }

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() =>
                    handlePageChange(index + 1)
                  }
                  className={`rounded-md border px-4 py-2 transition-colors duration-200 ${
                    currentPage === index + 1 ?
                      'bg-brand-accent text-brand-lighter'
                    : 'bg-neutral-background hover:bg-brand-light border-paragraph text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ),
            )}
          </div>
        )}
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
};

export default CategoryPage;
