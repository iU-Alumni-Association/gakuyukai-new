// src/types.ts

/** ブログ記事のデータ型を定義します。 */
export interface Blog {
  /** ユニークなブログ記事のID. */
  id: string;

  /** ブログ記事の公開日. */
  date: string;

  /** ブログ記事のタイトル. */
  title: string;

  /** ブログ記事の概要説明. */
  description: string;

  /** ブログ記事の本文コンテンツ. */
  content: string;

  /** ブログ記事のアイキャッチ画像. */
  eyecatch: MicroCMSImage;

  /** ブログ記事のカテゴリー. */
  category: Category;
}

/** カテゴリのデータ型を定義します。 */
export interface Category {
  /** ユニークなカテゴリのID. */
  id: string;

  /** カテゴリ名. */
  name: string;

  /** カテゴリの説明. */
  explanation: string;

  /** カテゴリの作成日時. */
  createdAt: string;

  /** カテゴリの更新日時. */
  updatedAt: string;

  /** カテゴリの画像. */
  image: MicroCMSImage;
}

/** MicroCMSの画像型を定義します。 */
export interface MicroCMSImage {
  /** 画像のURL. */
  url: string;

  /** 画像の幅. */
  width: number;

  /** 画像の高さ. */
  height: number;
}

/** 日付情報のデータ型を定義します。 */
export interface MicroCMSDate {
  /** 作成日時. */
  createdAt: string;

  /** 更新日時. */
  updatedAt: string;

  /** 公開日時. */
  publishedAt: string;

  /** 修正日時. */
  revisedAt: string;
}
