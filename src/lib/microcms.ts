import axios from 'axios';
import type { Blog, Category } from './types';

// API認証情報を環境変数から取得
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SERVICE_ID =
  process.env.NEXT_PUBLIC_SERVICE_ID;
const ENDPOINT = `https://${SERVICE_ID}.microcms.io/api/v1`;

// 必須の環境変数が存在するか確認
if (!SERVICE_ID) {
  throw new Error(
    'NEXT_PUBLIC_SERVICE_IDが必要です',
  );
}

if (!API_KEY) {
  throw new Error('MICROCMS_API_KEYが必要です');
}

/**
 * ブログ記事のリストを取得します。
 *
 * @example
 *   const { contents, totalCount } =
 *     await getBlogs(1, 10);
 *   console.log('ブログの合計数:', totalCount);
 *   contents.forEach((blog) => {
 *     console.log(blog.title);
 *   });
 *
 * @param {number} page - 現在のページ番号 (デフォルトは1).
 * @param {number} limit - 1ページあたりの記事数 (デフォルトは10).
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - ブログリストと合計記事数を含むオブジェクト.
 */
export const getBlogs = async (
  page = 1,
  limit = 10,
) => {
  try {
    const response = await axios.get<{
      /** ブログ記事の配列. */
      contents: Blog[];
      /** 記事の合計数. */
      totalCount: number;
    }>(`${ENDPOINT}/blog`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
      params: {
        offset: (page - 1) * limit,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('ブログ取得エラー:', error);
    return { contents: [], totalCount: 0 };
  }
};

/**
 * ブログ記事の詳細情報を取得します。
 *
 * @example
 *   const blogDetail = await getBlogDetail(
 *     'blog-id-123',
 *   );
 *   if (blogDetail) {
 *     console.log(
 *       'タイトル:',
 *       blogDetail.title,
 *     );
 *   } else {
 *     console.error(
 *       'ブログ記事が見つかりません',
 *     );
 *   }
 *
 * @param {string} contentId - ブログ記事のID.
 * @returns {Promise<Blog | null>} -
 *   ブログ記事の詳細、エラー時はnullを返します.
 */
export const getBlogDetail = async (
  contentId: string,
) => {
  try {
    const response = await axios.get<Blog>(
      `${ENDPOINT}/blog/${contentId}`,
      {
        headers: {
          'X-API-KEY': API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      'ブログ記事の詳細取得エラー:',
      error,
    );
    return null;
  }
};

/**
 * カテゴリのリストを取得します。
 *
 * @example
 *   const categories = await getCategories();
 *   console.log(
 *     '取得したカテゴリ数:',
 *     categories.length,
 *   );
 *   categories.forEach((category) => {
 *     console.log(category.name);
 *   });
 *
 * @returns {Promise<Category[]>} - カテゴリの配列.
 */
export const getCategories = async () => {
  try {
    const response = await axios.get<{
      /** カテゴリの配列. */
      contents: Category[];
    }>(`${ENDPOINT}/categories`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
    return response.data.contents;
  } catch (error) {
    console.error('カテゴリ取得エラー:', error);
    return [];
  }
};

/**
 * 指定されたカテゴリのブログ記事を取得します。
 *
 * @example
 *   const { contents, totalCount } =
 *     await getBlogsByCategory(
 *       'category-id-123',
 *       1,
 *       10,
 *     );
 *   console.log(
 *     'カテゴリ内ブログ数:',
 *     totalCount,
 *   );
 *   contents.forEach((blog) => {
 *     console.log(blog.title);
 *   });
 *
 * @param {string} categoryId - カテゴリのID.
 * @param {number} page - 現在のページ番号 (デフォルトは1).
 * @param {number} limit - 1ページあたりの記事数 (デフォルトは10).
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - ブログリストと合計記事数を含むオブジェクト.
 */
export const getBlogsByCategory = async (
  categoryId: string,
  page = 1,
  limit = 10,
) => {
  try {
    const response = await axios.get<{
      /** カテゴリ内のブログ記事の配列. */
      contents: Blog[];
      /** カテゴリ内の記事の合計数. */
      totalCount: number;
    }>(`${ENDPOINT}/blog`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
      params: {
        filters: `category[equals]${categoryId}`,
        offset: (page - 1) * limit,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'カテゴリ別ブログ取得エラー:',
      error,
    );
    return { contents: [], totalCount: 0 };
  }
};

/**
 * 指定されたカテゴリの詳細を取得します。
 *
 * @example
 *   const categoryDetail = await getCategory(
 *     'category-id-123',
 *   );
 *   if (categoryDetail) {
 *     console.log(
 *       'カテゴリ名:',
 *       categoryDetail.name,
 *     );
 *   } else {
 *     console.error(
 *       'カテゴリが見つかりません',
 *     );
 *   }
 *
 * @param {string} categoryId - カテゴリのID.
 * @returns {Promise<Category | null>} -
 *   カテゴリの詳細、エラー時はnullを返します.
 */
export const getCategory = async (
  categoryId: string,
) => {
  try {
    const response = await axios.get<Category>(
      `${ENDPOINT}/categories/${categoryId}`,
      {
        headers: {
          'X-API-KEY': API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      'カテゴリ詳細取得エラー:',
      error,
    );
    return null;
  }
};

/**
 * クエリでブログ記事を検索します。
 *
 * @example
 *   const { contents, totalCount } =
 *     await getBlogsByQuery(
 *       'JavaScript',
 *       1,
 *       10,
 *     );
 *   console.log('検索結果:', totalCount);
 *   contents.forEach((blog) => {
 *     console.log(blog.title);
 *   });
 *
 * @param {string} query - 検索クエリ文字列.
 * @param {number} page - 現在のページ番号 (デフォルトは1).
 * @param {number} limit - 1ページあたりの記事数 (デフォルトは10).
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - 検索結果のブログリストと合計記事数.
 */
export const getBlogsByQuery = async (
  query: string,
  page = 1,
  limit = 10,
) => {
  try {
    const response = await axios.get<{
      /** クエリに一致するブログ記事の配列. */
      contents: Blog[];
      /** 記事の合計数. */
      totalCount: number;
    }>(`${ENDPOINT}/blog`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
      params: {
        filters: `title[contains]${query}`,
        offset: (page - 1) * limit,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('ブログ検索エラー:', error);
    return { contents: [], totalCount: 0 };
  }
};

/**
 * ニュース記事のリストを取得します。
 *
 * @example
 *   const { contents, totalCount } =
 *     await getNews(1, 10);
 *   console.log('ニュース記事数:', totalCount);
 *   contents.forEach((news) => {
 *     console.log(news.title);
 *   });
 *
 * @param {number} page - 現在のページ番号 (デフォルトは1).
 * @param {number} limit - 1ページあたりの記事数 (デフォルトは10).
 * @param {string} [categoryId] - カテゴリID (オプション).
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - ニュース記事リストと合計記事数.
 */
export const getNews = async (
  page = 1,
  limit = 10,
  categoryId?: string,
) => {
  try {
    const response = await axios.get<{
      /** ニュース記事の配列. */
      contents: Blog[];
      /** 記事の合計数. */
      totalCount: number;
    }>(`${ENDPOINT}/news`, {
      headers: { 'X-API-KEY': API_KEY },
      params: {
        offset: (page - 1) * limit,
        limit,
        ...(categoryId && {
          filters: `category[equals]${categoryId}`,
        }), // カテゴリでフィルタリング
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'ニュース記事取得エラー:',
      error,
    );
    return { contents: [], totalCount: 0 };
  }
};

/**
 * ニュース記事の詳細を取得します。
 *
 * @example
 *   const newsDetail = await getNewsDetail(
 *     'news-id-123',
 *   );
 *   if (newsDetail) {
 *     console.log(
 *       'ニュースタイトル:',
 *       newsDetail.title,
 *     );
 *   } else {
 *     console.error(
 *       'ニュース記事が見つかりません',
 *     );
 *   }
 *
 * @param {string} contentId - ニュース記事のID.
 * @returns {Promise<Blog | null>} -
 *   ニュース記事の詳細、エラー時はnullを返します.
 */
export const getNewsDetail = async (
  contentId: string,
) => {
  try {
    const response = await axios.get<Blog>(
      `${ENDPOINT}/news/${contentId}`,
      {
        headers: {
          'X-API-KEY': API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      'ニュース記事詳細取得エラー:',
      error,
    );
    return null;
  }
};
