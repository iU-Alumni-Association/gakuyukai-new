/**
 * @file
 * このファイルは、ブログカテゴリーのページを表示するためのコンポーネントを提供します。
 * カテゴリーごとのブログ記事を取得し、ページネーション機能を実装しています。
 */

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

/**
 * ブログのカテゴリーに基づいたページを表示するコンポーネント
 * @returns {JSX.Element} カテゴリーページをレンダリングする要素
 */
const CategoryPage = (): JSX.Element => {
  const router = useRouter();
  const { categoryId } = router.query;

  // State管理: カテゴリー、ブログ記事、ページ数、読み込み状態
  const [category, setCategory] =
    useState<Category | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] =
    useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * @description
   * ページ変更時にページ番号を設定します。
   *
   * @param {number} page - 新しいページ番号
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * カテゴリーとブログ記事を取得するための非同期処理
   * カテゴリーIDと現在のページ番号が変わったときに実行される
   */
  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryAndBlogs = async () => {
      setLoading(true);
      try {
        // カテゴリー情報を取得
        const categoryData = await getCategory(
          categoryId as string,
        );
        setCategory(categoryData);

        // カテゴリーに基づくブログ記事を取得
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
          'カテゴリーとブログの取得中にエラーが発生しました:',
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
      {/* ローディングバーを表示 */}
      <LoadingBar loading={loading} />

      {/* メタデータ設定 */}
      <Meta
        title="i-u.io | ブログカテゴリー"
        description="i-u.ioのブログカテゴリーページです。"
        url="https://i-u.io/blog/category"
      />

      {/* ブログヘッダーとパンくずリスト */}
      <BlogHeader />
      <Breadcrumbs />

      <div className="container mx-auto min-h-svh p-4 pb-12">
        {/* カテゴリータイトル */}
        <h1 className="text-brand mb-8 text-h1 font-bold sm:text-h1Sm">
          {category ? category.name : ''}
        </h1>

        {/* カテゴリー説明と画像（存在する場合） */}
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

        {/* ブログリストまたは検索結果なしのメッセージ */}
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

        {/* ページネーション */}
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

      {/* フッター */}
      <Footer />
    </>
  );
};

export default CategoryPage;
