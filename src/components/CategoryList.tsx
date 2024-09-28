import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getBlogsByCategory, getCategory } from '@/lib/microcms';
import BlogItem from '@/components/BlogItem';
import NoResults from '@/components/NoResults';
import Head from 'next/head';
import { Blog, Category } from '@/lib/types';

interface CategoryListProps {
  setIsLoading: (isLoading: boolean) => void;
}

/**
 * Renders a list of blogs filtered by category.
 * Fetches the blogs and category information from MicroCMS based on the category ID in the URL.
 * Handles pagination and displays appropriate UI for no results.
 *
 * @param {object} props - Component props.
 * @param {(isLoading: boolean) => void} props.setIsLoading - Function to control loading state in parent component.
 */
const CategoryList: React.FC<CategoryListProps> = ({ setIsLoading }) => {
  const router = useRouter();
  const { categoryId } = router.query;

  // State management for blogs, category details, pagination
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Define number of blogs to fetch per page
  const blogsPerPage = 10;

  /**
   * Fetch blogs for the selected category and the current page.
   * Calculates total pages for pagination.
   *
   * @param {number} page - Current page number for fetching blogs.
   */
  useEffect(() => {
    const fetchBlogs = async (page: number) => {
      if (!categoryId) return;

      setIsLoading(true); // Show loading state
      const data = await getBlogsByCategory(categoryId as string, page, blogsPerPage);
      setBlogs(data.contents); // Set blogs in state
      setTotalPages(Math.ceil(data.totalCount / blogsPerPage)); // Calculate total pages
      setIsLoading(false); // Hide loading state
    };

    /**
     * Fetch category details based on category ID.
     */
    const fetchCategory = async () => {
      if (!categoryId) return;

      const data = await getCategory(categoryId as string);
      setCategory(data); // Set category details in state
    };

    fetchBlogs(currentPage);
    fetchCategory();
  }, [categoryId, setIsLoading, currentPage]);

  /**
   * Handle page change event.
   * @param {number} page - The new page number to navigate to.
   */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Update the current page state
  };

  return (
    <div className="blog-container">
      <Head>
        <title>{category ? `${category.name} のカテゴリ` : 'カテゴリ'} | 合同会社Kalytero</title>
        <meta name="description" content={category ? category.explanation : ''} />
        <meta
          name="keywords"
          content={`Uematsu, IT, 中小企業, DX, デジタルトランスフォーメーション, カテゴリ, ${category ? category.name : ''}`}
        />
      </Head>

      <h1>{category ? category.name : ''}</h1>

      {category && (category.explanation || category.image) && (
        <div className="category-info">
          {category.explanation && (
            <div className="category-description">
              <p>{category.explanation}</p>
            </div>
          )}
          {category.image && (
            <div className="category-image">
              <img src={category.image.url} alt={category.name} />
            </div>
          )}
        </div>
      )}

      {blogs.length === 0 ? (
        <NoResults query={category ? category.name : 'このカテゴリ'} />
      ) : (
        <ul className="blog-list">
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
