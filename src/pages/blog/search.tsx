/**
 * @file
 * このファイルは、ブログ検索ページの実装を提供します。
 * ユーザーが検索クエリを入力し、その結果としてブログ記事を表示する機能を持ちます。
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getBlogsByQuery } from '@/lib/microcms';
import type { Blog } from '@/lib/types';
import BlogItem from '@/components/BlogItem';
import NoResults from '@/components/NoResults';
import BlogHeader from '@/components/BlogHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import LoadingBar from '@/components/LoadingBar';
import Meta from '@/components/Meta';

/**
 * @description
 * 検索結果ページを表示するためのコンポーネントです。このコンポーネントは、Next.jsのルーターから
 * 検索クエリを取得し、そのクエリに基づいてブログ記事を検索・表示します。
 *
 * @component
 */
const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;

  // ブログ記事、読み込みステータス、ページネーションの状態を管理するためのstate
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] =
    useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /**
   * @description
   * 検索クエリとページ番号に基づいてブログ記事を取得する非同期関数。
   * 検索クエリまたは現在のページが変更されるたびにこの関数が実行されます。
   *
   * @remarks
   * 1ページあたり10件のブログ記事を表示するように設定されています。
   */
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const { contents, totalCount } =
          await getBlogsByQuery(
            query as string,
            currentPage,
          );
        setBlogs(contents);
        setTotalPages(Math.ceil(totalCount / 10)); // 1ページあたり10件の記事で総ページ数を計算
      } catch (error) {
        console.error(
          'ブログ取得中にエラーが発生しました:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [query, currentPage]);

  /**
   * @description
   * ページ変更時にページ番号を設定します。
   *
   * @param {number} page - 新しいページ番号
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* メタ情報 */}
      <Meta
        title="iU 学友会 | ブログ検索"
        description="iU 学友会のブログ検索ページです。お探しの記事を検索してご覧いただけます。"
        url="https://i-u.io/search"
      />
      <BlogHeader />
      <Breadcrumbs />

      <div className="container mx-auto min-h-svh p-4 pb-12">
        {/* ローディングバーの表示 */}
        <LoadingBar loading={loading} />

        {/* 検索結果のヘッダー */}
        <h1 className="mb-8 text-h1 font-bold text-gray-800 sm:text-h1Sm">
          検索結果: {query}
        </h1>

        {/* メインコンテンツ：読み込み中、結果なし、またはブログリストの表示 */}
        {loading ?
          <p className="text-center text-p text-gray-600 sm:text-pSm">
            読み込み中...
          </p>
        : blogs.length === 0 ?
          <NoResults query={query as string} />
        : <ul className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogItem
                key={blog.id}
                blog={blog}
              />
            ))}
          </ul>
        }

        {/* ページネーションのコントロール */}
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
                      'bg-highlight text-background'
                    : 'border-paragraph bg-background text-gray-700 hover:bg-secondary'
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

export default SearchPage;
