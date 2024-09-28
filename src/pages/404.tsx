import Link from 'next/link';
import Head from 'next/head';

/**
 * Custom 404 Error Page
 *
 * Displays when the requested page cannot be found.
 * Includes a link to navigate back to the home page.
 */
const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Page metadata */}
      <Head>
        <title>404 - ページが見つかりません</title>
      </Head>

      {/* 404 Error Title */}
      <h1 className="text-5xl font-bold text-customBlue mb-4">404</h1>

      {/* Error Message */}
      <p className="text-xl text-gray-700 mb-8">お探しのページが見つかりません。</p>

      {/* Link back to Home */}
      <Link href="/" passHref>
        <a className="px-6 py-3 bg-customBlue text-white rounded-md shadow hover:bg-customLightBlue transition-colors">
          ホームに戻る
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
