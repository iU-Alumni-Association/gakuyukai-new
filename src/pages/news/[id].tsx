/**
 * @file
 * このファイルは、ニュース記事の詳細ページを表示するための
 * コンポーネントと、静的生成のための関数を提供します。
 * 記事が存在しない場合にはフォールバックとして
 * "ニュースが見つかりません" を表示します。
 */

export const config = {
  runtime: 'experimental-edge',
};
import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import {
  getNewsDetail,
  getNews,
} from '@/lib/microcms';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import type { Blog } from '@/lib/types';
import Head from 'next/head';

type NewsDetailProps = {
  news: Blog | null;
};

/**
 * ニュース詳細ページコンポーネント
 *
 * @param {NewsDetailProps} props - ニュース詳細データを含むプロパティ
 * @returns {JSX.Element} - レンダリングされたニュース詳細ページの JSX 要素
 * @remarks
 * ニュースが存在しない場合、"ニュースが見つかりません" というメッセージを表示します。
 */
const NewsDetailPage = ({
  news,
}: NewsDetailProps): JSX.Element => {
  // ニュースが見つからない場合、フォールバックメッセージを表示
  if (!news) {
    return (
      <p className="text-center">
        ニュースが見つかりません
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>{news.title}</title>
        <meta
          name="description"
          content={news.title}
        />
      </Head>
      <Header />
      <Breadcrumbs />
      <div className="container mx-auto mt-10 px-4 py-8">
        <h1 className="mb-6 text-h1 font-bold sm:text-h1Sm">
          {news.title}
        </h1>
        <p className="mb-4 text-p text-gray-600 sm:text-pSm">
          {new Date(
            news.date,
          ).toLocaleDateString()}
        </p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: news.content,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

/**
 * 静的生成用のパスを生成します。
 *
 * @returns {Promise<{
 *   paths: { params: { id: string } }[];
 *   fallback: boolean;
 * }>}
 *   - 記事のパスリストおよびフォールバックの有効化設定
 * @remarks
 * まだ事前生成されていないパスも動的に生成できるよう、`fallback: true` に設定しています。
 */
export const getStaticPaths: GetStaticPaths =
  async () => {
    const { contents } = await getNews();
    const paths = contents.map((news) => ({
      params: { id: news.id },
    }));

    return {
      paths,
      fallback: true, // 動的ページ生成を有効にします
    };
  };

/**
 * ニュース詳細ページのデータをビルド時に取得します。
 *
 * @param {any} context - 静的プロップスのコンテキスト
 * @returns {Promise<{
 *   props: { news: Blog };
 *   notFound?: boolean;
 *   revalidate: number;
 * }>}
 *   - ページのプロパティ、またはニュースが見つからない場合は `notFound` フラグ
 * @remarks
 * Incremental Static Regeneration (ISR) を利用して、ニュースが定期的に最新のものに更新されます。
 */
export const getStaticProps: GetStaticProps =
  async (context) => {
    const { id } = context.params!;
    const news = await getNewsDetail(
      id as string,
    );

    // ニュースが見つからない場合は 404 ページを返す
    if (!news) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        news,
      },
      revalidate: 1, // ISRを使い、コンテンツを最新の状態に保つ
    };
  };

export default NewsDetailPage;
