/**
 * @file
 * このファイルは、ブログの詳細ページのレンダリングを担当しています。
 * microCMSからブログデータを取得し、動的に表示する機能を提供します。
 */

export const runtime = 'experimental-edge';

import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  getBlogDetail,
  getBlogs,
} from '@/lib/microcms';
import type { Blog } from '@/lib/types';
import BlogHeader from '@/components/BlogHeader';
import Footer from '@/components/Footer';
import LoadingBar from '@/components/LoadingBar';
import Breadcrumbs from '@/components/Breadcrumbs';

// Define the props for the BlogPage component
/**
 * ブログページコンポーネントのプロパティ型
 * @property {Blog | null} blog - ブログのデータ、存在しない場合はnull
 */
type BlogProps = {
  blog: Blog | null;
};

/**
 * BlogPage コンポーネント
 * ブログデータを動的にレンダリングします。
 *
 * @param {BlogProps} props - ブログデータを含むプロパティ
 * @returns {JSX.Element} - レンダリングされたブログページ
 */
const BlogPage = ({ blog }: BlogProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(
    router.isFallback,
  );

  // Fallbackモードに基づいてロード状態を管理
  useEffect(() => {
    if (!router.isFallback) {
      setLoading(false);
    }
  }, [router.isFallback]);

  // データ取得中にローディング画面を表示
  if (loading) {
    return (
      <>
        <LoadingBar loading={loading} />
        <div className="flex min-h-screen items-center justify-center p-4">
          <p className="text-p text-gray-600 sm:text-pSm">
            ロード中...
          </p>
        </div>
      </>
    );
  }

  // ブログデータがない場合、nullを返す
  if (!blog) {
    return null;
  }

  return (
    <>
      <LoadingBar loading={loading} />
      <BlogHeader />
      <Breadcrumbs />
      <div className="container mx-auto mt-8 min-h-screen p-4 px-4 pb-12">
        <Head>
          <title>{blog.title}</title>
          <meta
            name="description"
            content={blog.description}
          />
          <meta
            name="keywords"
            content={blog.category?.name || ''}
          />
        </Head>

        {/* ブログタイトル */}
        <h1 className="mb-6 text-h1 font-bold text-gray-900 sm:text-h1Sm">
          {blog.title}
        </h1>

        {/* アイキャッチ画像 */}
        {blog.eyecatch && (
          <div className="mb-8 flex justify-center">
            <img
              src={blog.eyecatch.url}
              alt={blog.title}
              className="w-full max-w-3xl object-cover"
            />
          </div>
        )}

        {/* ブログコンテンツ */}
        <div
          className="prose prose-lg break-all"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

/**
 * GetStaticPaths - ブログページ用の動的パスを生成します。
 * ブログIDのリストを取得してパスを作成します。
 *
 * @returns {Promise<{
 *   paths: { params: { id: string } }[];
 *   fallback: boolean;
 * }>}
 *   - 動的パスとFallback設定を返す
 */
export const getStaticPaths: GetStaticPaths =
  async () => {
    const data = await getBlogs();
    const paths = data.contents.map((blog) => ({
      params: { id: blog.id },
    }));

    return { paths, fallback: true };
  };

/**
 * GetStaticProps - 指定されたIDに基づいてブログデータを取得します。
 *
 * @param {Object} context - Next.jsのコンテキストオブジェクト、ルートパラメータを含む
 * @returns {Promise<
 *   | { props: BlogProps; revalidate: number }
 *   | { notFound: true }
 * >}
 *   - ブログデータ、またはデータが見つからない場合は404を返す
 */
export const getStaticProps: GetStaticProps =
  async (context) => {
    const { id } = context.params!;
    const blog = await getBlogDetail(
      id as string,
    );

    // デバッグ用に取得したブログデータをログ出力
    console.log('Blog data:', blog);

    // ブログが見つからない場合は404を返す
    if (!blog) {
      return {
        notFound: true,
      };
    }

    // ブログデータをpropsとして返し、再検証のインターバルを設定
    return {
      props: {
        blog,
      },
      revalidate: 1,
    };
  };

export default BlogPage;
