import Head from 'next/head';
import React from 'react';

interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
}

/**
 * Metaコンポーネント.
 *
 * このコンポーネントは、SEOおよびSNSシェア用のメタデータを生成します。ページのタイトル、説明、キーワード、画像URL、ページURLなどを設定し、検索エンジン最適化
 * (SEO) やSNSでのシェアに必要なメタタグを自動で生成・挿入します。
 *
 * @remarks
 *   ### プロパティ:
 *
 *   - `title`: ページのタイトルを設定します。SEOやブラウザタブに表示されます。
 *   - `description`:
 *       ページの説明を設定します。SEOとSNSシェア時に使用されます。デフォルト値は「情報経営イノベーション学友会は学生が運営する自治組織です」。
 *   - `keywords`:
 *       SEOのためのキーワードをカンマ区切りで指定します。デフォルトでは「情報経営イノベーション学友会,
 *       iU GAKUYUKAI, 学友会, 学生自治組織」が使用されます。
 *   - `imageUrl`:
 *       SNSでシェアされる際に表示される画像のURLを指定します。デフォルトは「/main-top.webp」です。
 *   - `url`: ページのURLを指定します。デフォルトでは「https://i-u.io」が使用されます。
 *
 *   ### Google Analytics:
 *
 *   - `NEXT_PUBLIC_GA_TRACKING_ID`: Google
 *       AnalyticsのトラッキングIDが環境変数で設定されている場合、Google
 *       Analyticsのコードが埋め込まれます。
 *
 * @example
 *   ```typescript
 *   <Meta title="ホームページ" />
 *   ```;
 *
 * @returns {JSX.Element}
 *   ページのヘッダーにメタタグを追加するための要素.
 * @source
 */
const Meta: React.FC<MetaProps> = ({
  title,
  description = '情報経営イノベーション学友会は学生が運営する自治組織です',
  keywords = '情報経営イノベーション学友会, iU GAKUYUKAI, 学友会, 学生自治組織',
  imageUrl = '/main-top.webp',
  url = 'https://i-u.io',
}) => {
  return (
    <Head>
      {/* ページタイトル */}
      <title>{title}</title>

      {/* SEO向けメタタグ */}
      <meta
        name="description"
        content={description}
      />
      <meta name="keywords" content={keywords} />
      <meta
        property="author"
        content="iU Gakuyukai."
      />

      {/* Open Graphメタタグ */}
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={imageUrl}
      />
      <meta property="og:url" content={url} />
      <meta
        property="og:type"
        content="website"
      />

      {/* Twitterカードメタタグ */}
      <meta
        name="twitter:creator"
        content="@iuniversity2020"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        content={imageUrl}
      />

      {/* ビューポート設定 */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Google Analyticsの埋め込み */}
      {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
            `,
            }}
          />
        </>
      )}
    </Head>
  );
};

export default Meta;
