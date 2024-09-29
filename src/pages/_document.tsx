
import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

/**
 * カスタムDocumentコンポーネント
 * ページ全体に共通のHTML構造を提供します。
 * @returns {JSX.Element} HTMLドキュメントをレンダリングします。
 */
export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
