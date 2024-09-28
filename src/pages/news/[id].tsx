export const runtime = "experimental-edge";

import { GetStaticPaths, GetStaticProps } from "next";
import { getNewsDetail, getNews } from "@/lib/microcms";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import type { Blog } from "@/lib/types";
import Head from "next/head";

type NewsDetailProps = {
  news: Blog | null;
};

/**
 * News Detail Page Component.
 *
 * @param {NewsDetailProps} props - The news detail props containing the news data.
 * @returns {JSX.Element} - The rendered NewsDetailPage component.
 */
const NewsDetailPage = ({ news }: NewsDetailProps): JSX.Element => {
  // If no news is found, display a fallback message.
  if (!news) {
    return <p className="text-center">ニュースが見つかりません</p>;
  }

  return (
    <>
      <Head>
        <title>{news.title}</title>
        <meta name="description" content={news.title} />
      </Head>
      <Header />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8 mt-10">
        <h1 className="text-h1 sm:text-h1Sm font-bold mb-6">{news.title}</h1>
        <p className="text-p sm:text-pSm text-gray-600 mb-4">
          {new Date(news.date).toLocaleDateString()}
        </p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>
      <Footer />
    </>
  );
};

/**
 * Generate paths for static generation.
 *
 * @returns {Promise<{ paths: { params: { id: string } }[], fallback: boolean }>}
 *          - Paths for the news articles and whether fallback should be enabled.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const { contents } = await getNews();
  const paths = contents.map((news) => ({
    params: { id: news.id },
  }));

  return {
    paths,
    fallback: true, // Enable dynamic page generation if the path is not pre-rendered.
  };
};

/**
 * Fetch data for the news detail page at build time.
 *
 * @param {any} context - The static props context.
 * @returns {Promise<{ props: { news: Blog }, notFound?: boolean, revalidate: number }>}
 *          - The props for the page, or a notFound flag if no news is found.
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const news = await getNewsDetail(id as string);

  // If the news is not found, return a 404 page.
  if (!news) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      news,
    },
    revalidate: 1, // Enable Incremental Static Regeneration (ISR) for keeping the content up to date.
  };
};

export default NewsDetailPage;
