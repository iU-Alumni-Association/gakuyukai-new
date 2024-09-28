import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/microcms";
import BlogHeader from "@/components/BlogHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import LoadingBar from "@/components/LoadingBar";
import type { Category } from "@/lib/types";

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
        console.error("Error fetching categories:", error);
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
      <div className="container mx-auto py-12 min-h-svh">
        <h1 className="px-4 text-h1 sm:text-h1Sm font-bold text-gray-800 mb-8">
          カテゴリー一覧
        </h1>

        {/* Handle loading, empty state, and display categories */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-p sm:text-pSm text-center text-gray-600">
              読み込み中...
            </p>
          </div>
        ) : categories.length === 0 ? (
          <p className="text-p sm:text-pSm text-center">
            カテゴリーが見つかりません
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <li
                key={category.id}
                className="px-4 hover:bg-secondary transition"
              >
                <Link
                  href={`/blog/category/${category.id}`}
                  passHref
                  legacyBehavior
                >
                  <span
                    role="button"
                    className="block text-h3 sm:text-h3Sm font-semibold text-highlight hover:underline cursor-pointer"
                  >
                    {category.name}
                  </span>
                </Link>
                {/* Show explanation if available */}
                {category.explanation && (
                  <p className="text-paragraph text-p sm:text-pSm mt-2">
                    {category.explanation}
                  </p>
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
