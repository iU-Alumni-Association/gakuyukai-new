import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/microcms';
import BlogHeader from '@/components/BlogHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import LoadingBar from '@/components/LoadingBar';
import type { Category } from '@/lib/types';

/**
 * CategoriesIndex Component.
 *
 * Displays a list of blog categories fetched from
 * the MicroCMS API. Shows a loading indicator
 * while fetching data and handles empty or error
 * states.
 */
const CategoriesIndex = () => {
  const [categories, setCategories] = useState<
    Category[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetch categories from MicroCMS and update
     * state. Handles loading and error states.
     */
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(
          'Error fetching categories:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Show loading bar while data is being fetched */}
      <LoadingBar loading={loading} />

      {/* Blog header */}
      <Meta
        title="i-u.io | ブログカテゴリー一覧"
        description="i-u.ioのブログカテゴリー一覧ページです。"
        url="https://i-u.io/blog/category"
      />
      <BlogHeader />
      <Breadcrumbs />

      {/* Main container for category listing */}
      <div className="container mx-auto min-h-svh pb-12">
        <h1 className="mb-8 px-4 text-h1 font-bold text-gray-800 sm:text-h1Sm">
          カテゴリー一覧
        </h1>

        {/* Handle loading, empty state, and display categories */}
        {loading ?
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-center text-p text-gray-600 sm:text-pSm">
              読み込み中...
            </p>
          </div>
        : categories.length === 0 ?
          <p className="text-center text-p sm:text-pSm">
            カテゴリーが見つかりません
          </p>
        : <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="px-4 transition hover:bg-secondary"
              >
                <Link
                  href={`/blog/category/${category.id}`}
                  passHref
                  legacyBehavior
                >
                  <span
                    role="button"
                    className="block cursor-pointer text-h3 font-semibold text-highlight hover:underline sm:text-h3Sm"
                  >
                    {category.name}
                  </span>
                </Link>
                {/* Show explanation if available */}
                {category.explanation && (
                  <p className="mt-2 text-p text-paragraph sm:text-pSm">
                    {category.explanation}
                  </p>
                )}
              </li>
            ))}
          </ul>
        }
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default CategoriesIndex;
