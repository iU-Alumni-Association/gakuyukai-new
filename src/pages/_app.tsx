/**
 * @file
 * このファイルは、Next.jsのカスタムAppコンポーネントを定義します。
 * 全ページに適用されるグローバル設定やレイアウトを管理します。
 */

import { AppProps } from 'next/app';
import '@/styles/globals.css';

/**
 * アプリケーション全体のカスタムAppコンポーネント
 * @param {AppProps} props - ページコンポーネントとそのプロパティ
 * @returns {JSX.Element} ページコンポーネントをレンダリングします。
 */
function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
