import { useState, useEffect } from 'react';
import { getBlogs } from '@/lib/microcms';
import type { Blog } from '@/lib/types';
import BlogItem from '@/components/BlogItem';
import BlogHeader from '@/components/BlogHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoadingBar from '@/components/LoadingBar';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';

const BlogPage = () => {
  // ブログ記事、ページネーション、ローディング状態を管理するためのステート
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] =
    useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * MicroCMSからブログ記事を取得する関数。 コンポーネントのマウント時、もしくは
   * `currentPage` が変わった時に実行されます。
   * ローディング状態とエラーハンドリングも行います。
   */
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // ローディングインジケーターを表示
      try {
        const { contents, totalCount } =
          await getBlogs(currentPage, 10);
        setBlogs(contents);
        setTotalPages(Math.ceil(totalCount / 10)); // 合計ページ数を計算
      } catch (error) {
        console.error(
          'ブログ記事の取得中にエラーが発生しました:',
          error,
        );
      } finally {
        setLoading(false); // ローディングインジケーターを非表示
      }
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <>
      {/* ローディングバーコンポーネント */}
      <LoadingBar loading={loading} />

      {/* Metaセクション */}
      <Meta
        title="iU 学友会 | ブログ"
        description="学友会のブログページです。最新の記事をご覧いただけます。"
        url="https://i-u.io/blog"
      />
      {/* ブログヘッダー */}
      <BlogHeader />
      <Breadcrumbs />

      <div className="container mx-auto min-h-svh p-4 pb-12">
        <h1 className="mb-8 text-h3 font-bold text-gray-800 sm:text-h3Sm">
          最近の記事
        </h1>

        {/* ローディング状態に基づく条件付きレンダリング */}
        {loading ?
          <p className="text-hp sm:text-hpSm text-center text-gray-600">
            読み込み中...
          </p>
        : <ul className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogItem
                key={blog.id}
                blog={blog}
              />
            ))}
          </ul>
        }

        {/* ページネーションコントロール（複数ページがある場合のみ表示） */}
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
                      'bg-highlight text-gray-700'
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

      {/* フッターコンポーネント */}
      <Footer />
    </>
  );
};

export default BlogPage;
