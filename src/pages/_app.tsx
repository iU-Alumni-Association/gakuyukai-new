

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
