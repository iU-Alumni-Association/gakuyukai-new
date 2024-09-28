import Head from "next/head";
import React from "react";

interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  url?: string;
}

const Meta: React.FC<MetaProps> = ({
  title,
  description = "情報経営イノベーション学友会は学生が運営する自治組織です",
  keywords = "情報経営イノベーション学友会, iU GAKUYUKAI, 学友会, 学生自治組織",
  imageUrl = "/main-top.webp",
  url = "https://i-u.io",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="author" content="iU Gakuyukai." />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:creator" content="@iuniversity2020" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Google Analytics */}
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
