import Link from 'next/link';
import Head from 'next/head';

/**
 * Custom 404 Error Page.
 *
 * Displays when the requested page cannot be
 * found. Includes a link to navigate back to the
 * home page.
 */
const Custom404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
      {/* Page metadata */}
      <Head>
        <title>
          404 - ページが見つかりません
        </title>
      </Head>

      {/* 404 Error Title */}
      <h1 className="mb-4 text-5xl font-bold text-highlight">
        404
      </h1>

      {/* Error Message */}
      <p className="mb-8 text-xl text-gray-700">
        お探しのページが見つかりません。
      </p>

      {/* Link back to Home */}
      <Link href="/" passHref>
        <a className="rounded-md bg-highlight px-6 py-3 text-background shadow transition-colors hover:bg-secondary">
          ホームに戻る
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
