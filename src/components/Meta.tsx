/**
 * @file
 * このファイルは、Metaコンポーネントを提供します。Metaコンポーネントは、ページごとのメタデータを管理し、SEOおよびSNSでのシェア時に使用される情報を設定します。
 */
import Head from 'next/head';
import React from 'react';

/**
 * メタ情報を管理するためのプロパティ型
 * @property {string} title - ページのタイトル
 * @property {string} [description] - ページの説明（デフォルトは学生自治組織に関する説明）
 * @property {string} [keywords] - 検索エンジン最適化のためのキーワード（デフォルトで指定されたキーワードが使用される）
 * @property {string} [imageUrl] - SNSでのシェア用画像のURL（デフォルトはメインイメージ）
 * @property {string} [url] - ページのURL（デフォルトはメインサイトのURL）
 */
interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
}

/**
 * Metaコンポーネントは、SEOおよびSNSシェア用のメタデータを生成します。
 * @param {MetaProps} props - メタ情報の設定に使用するプロパティ
 * @returns {JSX.Element} ページのヘッダーにメタタグを追加するための要素
 * @example
 * <Meta title="ホームページ" />
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
