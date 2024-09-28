import { useState, useEffect } from 'react';
import { getCategories } from '@/lib/microcms';
import BlogHeader from '@/components/BlogHeader';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import Link from 'next/link';
import LoadingBar from '@/components/LoadingBar';
import type { Category } from '@/lib/types';

/**
 * CategoriesIndex Component
 *
 * Displays a list of blog categories fetched from the MicroCMS API.
 * Shows a loading indicator while fetching data and handles empty or error states.
 */
const CategoriesIndex = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetch categories from MicroCMS and update state.
     * Handles loading and error states.
     */
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
      {/* Meta section */}
      <Meta
        title="Kalytero | ブログカテゴリー一覧"
        description="Kalyteroのブログカテゴリー一覧ページです。"
        url="https://kalytero.ne.jp/blog/category"
      />
      <BlogHeader />

      {/* Main container for category listing */}
      <div className="container mx-auto py-12 min-h-svh">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">カテゴリー一覧</h1>

        {/* Handle loading, empty state, and display categories */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-center text-gray-600">読み込み中...</p>
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center">カテゴリーが見つかりません</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <li key={category.id} className="border p-4 hover:bg-gray-100 transition">
                <Link
                  href={`/blog/category/${category.id}`}
                  className="block text-xl font-semibold text-customBlue hover:underline"
                >
                  {category.name}
                </Link>
                {/* Show explanation if available */}
                {category.explanation && (
                  <p className="text-gray-600 mt-2">{category.explanation}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default CategoriesIndex;
