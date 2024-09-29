/**
 * @file
 * このファイルは、MicroCMSのデータモデルを定義しています。ブログ、カテゴリー、および関連する画像の型を定義し、
 * これらのデータを使用してサイト内の表示や機能をサポートします。
 */

/**
 * MicroCMSにおける画像データの型定義
 * @property {string} url - 画像のURL
 * @property {number} height - 画像の高さ (ピクセル単位)
 * @property {number} width - 画像の幅 (ピクセル単位)
 */
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

/**
 * MicroCMSで使用される日時情報の型定義
 * @property {string} createdAt - 作成日時
 * @property {string} updatedAt - 更新日時
 * @property {string} publishedAt - 公開日時
 * @property {string} revisedAt - 改訂日時
 */
export type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

/**
 * カテゴリーの型定義
 * @property {string} id - カテゴリーのID
 * @property {string} createdAt - カテゴリーの作成日時
 * @property {string} updatedAt - カテゴリーの更新日時
 * @property {string} publishedAt - カテゴリーの公開日時
 * @property {string} revisedAt - カテゴリーの改訂日時
 * @property {string} name - カテゴリー名
 * @property {string} [explanation] - カテゴリーの説明 (任意)
 * @property {MicroCMSImage} [image] - カテゴリーの画像 (任意)
 */
export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  explanation?: string; // オプショナルなカテゴリーの説明
  image?: MicroCMSImage; // オプショナルなカテゴリーの画像
};

/**
 * ブログ記事の型定義
 * @property {string} id - ブログ記事のID
 * @property {string} date - ブログ記事の投稿日時
 * @property {string} title - ブログ記事のタイトル
 * @property {string} description - ブログ記事の概要
 * @property {string} content - ブログ記事のメインコンテンツ
 * @property {MicroCMSImage} [eyecatch] - ブログ記事のアイキャッチ画像 (任意)
 * @property {Category} category - 関連するカテゴリー
 * @property {string} createdAt - ブログ記事の作成日時
 * @property {string} updatedAt - ブログ記事の更新日時
 * @property {string} publishedAt - ブログ記事の公開日時
 * @property {string} revisedAt - ブログ記事の改訂日時
 */
export type Blog = {
  id: string;
  date: string; // ブログ記事の投稿日時
  title: string; // ブログ記事のタイトル
  description: string; // ブログ記事の概要
  content: string; // ブログ記事のメインコンテンツ
  eyecatch?: MicroCMSImage; // オプショナルなアイキャッチ画像
  category: Category; // 関連するカテゴリー
} & MicroCMSDate; // MicroCMSDateを継承して共通の日付フィールドを持つ
