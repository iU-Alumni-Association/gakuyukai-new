/**
 * @file
 * このファイルは、404エラーページを表示するカスタム404コンポーネントを定義します。
 */

import Link from 'next/link';
import Head from 'next/head';

/**
 * カスタム404エラーページ
 * @description
 * ページが見つからない場合に表示されるエラーページです。ホームへのリンクを含みます。
 * @returns {JSX.Element} 404エラーページをレンダリングします。
 */
const Custom404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
      {/* ページのメタデータ */}
      <Head>
        <title>
          404 - ページが見つかりません
        </title>
      </Head>

      {/* 404エラータイトル */}
      <h1 className="mb-4 text-5xl font-bold text-highlight">
        404
      </h1>

      {/* エラーメッセージ */}
      <p className="mb-8 text-xl text-gray-700">
        お探しのページが見つかりません。
      </p>

      {/* ホームへのリンク */}
      <Link href="/" passHref>
        <a className="rounded-md bg-highlight px-6 py-3 text-background shadow transition-colors hover:bg-secondary">
          ホームに戻る
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
