import { useState, useEffect } from 'react';
import {
  getNews,
  getCategories,
} from '@/lib/microcms';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import CardNews from '@/components/CardNews';
import LoadingBar from '@/components/LoadingBar';
import Meta from '@/components/Meta';
import type { Blog, Category } from '@/lib/types';

/**
 * NewsPage component renders a paginated list of news articles with category sorting.
 */
const NewsPage = () => {
  const [news, setNews] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<
    Category[]
  >([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(''); // State for selected category
  const [currentPage, setCurrentPage] =
    useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch news articles based on selected category and current page.
   */
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { contents, totalCount } =
          await getNews(
            currentPage,
            10,
            selectedCategory,
          );
        setNews(contents);
        setTotalPages(Math.ceil(totalCount / 10));
      } catch (error) {
        console.error(
          'Error fetching news:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [currentPage, selectedCategory]);

  /**
   * Fetch categories on initial load.
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error(
          'Error fetching categories:',
          error,
        );
      }
    };
    fetchCategories();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (
    category: string,
  ) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <>
      <LoadingBar loading={loading} />
      <Meta
        title="iU 学友会 | ニュース"
        description="iU 学友会のニュース一覧ページです。最新のニュースをご覧いただけます。"
        url="https://i-u.io/news"
      />
      <Header />
      <Breadcrumbs />
      <div className="container mx-auto min-h-svh pb-12">
        <h2 className="mx-4 mb-12 text-h2 font-bold text-headline sm:text-h2Sm">
          ニュース一覧
        </h2>

        {/* Category filter */}
        <div className="mx-4 mb-8">
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) =>
              handleCategoryChange(e.target.value)
            }
            className="rounded-md border border-paragraph bg-background p-2"
          >
            <option value="">すべて</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* News list */}
        {loading ?
          <p className="text-center text-p text-paragraph sm:text-pSm">
            読み込み中...
          </p>
        : <>
            {news.length === 0 ?
              <p className="text-center text-p text-paragraph sm:text-pSm">
                {selectedCategory ?
                  'このカテゴリにはニュースがありません。'
                : 'ニュースがありません。'}
              </p>
            : <ul className="mx-4 mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {news.map((item) => (
                  <li key={item.id}>
                    <CardNews
                      title={item.title}
                      description={
                        item.description
                      }
                      date={item.date}
                      id={item.id}
                      category={
                        item.category.name
                      }
                    />
                  </li>
                ))}
              </ul>
            }
          </>
        }

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() =>
                    handlePageChange(index + 1)
                  }
                  className={`rounded-md border px-4 py-2 transition-colors duration-200 ${
                    currentPage === index + 1 ?
                      'bg-highlight text-paragraph'
                    : 'border-paragraph bg-background text-paragraph hover:bg-secondary'
                  }`}
                >
                  {index + 1}
                </button>
              ),
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
