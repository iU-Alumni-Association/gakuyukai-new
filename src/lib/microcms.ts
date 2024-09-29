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
 * MicroCMSからブログ記事のリストを取得します。
 *
 * @param {number} page - ページネーション用の現在のページ番号
 * @param {number} limit - 1ページあたりのブログ記事数
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - ブログリストと合計記事数を含むオブジェクト
 *
 * @example
 * ```
 * const { contents, totalCount } = await getBlogs(1, 10);
 * console.log('ブログの合計数:', totalCount);
 * contents.forEach(blog => {
 *   console.log(blog.title);
 * });
 * ```
 */
export const getBlogs = async (
  page = 1,
  limit = 10,
) => {
  try {
    const response = await axios.get<{
      contents: Blog[];
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
 * 指定されたブログ記事の詳細情報を取得します。
 *
 * @param {string} contentId - ブログ記事のユニークなID
 * @returns {Promise<Blog | null>} - ブログ記事の詳細情報、エラー時はnullを返します
 *
 * @example
 * ```
 * const blogDetail = await getBlogDetail('blog-id-123');
 * if (blogDetail) {
 *   console.log('タイトル:', blogDetail.title);
 * } else {
 *   console.error('ブログ記事が見つかりません');
 * }
 * ```
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
 * MicroCMSからすべてのカテゴリのリストを取得します。
 *
 * @returns {Promise<Category[]>} - カテゴリリスト
 *
 * @example
 * ```
 * const categories = await getCategories();
 * console.log('取得したカテゴリ数:', categories.length);
 * categories.forEach(category => {
 *   console.log(category.name);
 * });
 * ```
 */
export const getCategories = async () => {
  try {
    const response = await axios.get<{
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
 * 指定されたカテゴリでブログ記事を取得します。
 *
 * @param {string} categoryId - カテゴリのユニークなID
 * @param {number} page - ページネーション用の現在のページ番号
 * @param {number} limit - 1ページあたりのブログ記事数
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - 指定カテゴリのブログリストと合計記事数
 *
 * @example
 * ```
 * const { contents, totalCount } = await getBlogsByCategory('category-id-123', 1, 10);
 * console.log('カテゴリ内ブログ数:', totalCount);
 * contents.forEach(blog => {
 *   console.log(blog.title);
 * });
 * ```
 */
export const getBlogsByCategory = async (
  categoryId: string,
  page = 1,
  limit = 10,
) => {
  try {
    const response = await axios.get<{
      contents: Blog[];
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
 * 指定されたカテゴリの詳細情報を取得します。
 *
 * @param {string} categoryId - カテゴリのユニークなID
 * @returns {Promise<Category | null>} - カテゴリの詳細情報、エラー時はnullを返します
 *
 * @example
 * ```
 * const categoryDetail = await getCategory('category-id-123');
 * if (categoryDetail) {
 *   console.log('カテゴリ名:', categoryDetail.name);
 * } else {
 *   console.error('カテゴリが見つかりません');
 * }
 * ```
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
 * クエリ文字列を使ってブログ記事を検索します。
 *
 * @param {string} query - フィルタリングするための検索文字列
 * @param {number} page - ページネーション用の現在のページ番号
 * @param {number} limit - 1ページあたりのブログ記事数
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - 検索クエリに一致するブログリストと合計記事数
 *
 * @example
 * ```
 * const { contents, totalCount } = await getBlogsByQuery('JavaScript', 1, 10);
 * console.log('検索結果:', totalCount);
 * contents.forEach(blog => {
 *   console.log(blog.title);
 * });
 * ```
 */
export const getBlogsByQuery = async (
  query: string,
  page = 1,
  limit = 10,
) => {
  try {
    const response = await axios.get<{
      contents: Blog[];
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
 * @param {number} page - ページネーション用の現在のページ番号
 * @param {number} limit - 1ページあたりのニュース記事数
 * @param {string} [categoryId] - （オプション）カテゴリIDでフィルタリングする
 * @returns {Promise<{
 *   contents: Blog[];
 *   totalCount: number;
 * }>}
 *   - ニュース記事リストと合計記事数
 *
 * @example
 * ```
 * const { contents, totalCount } = await getNews(1, 10);
 * console.log('ニュース記事数:', totalCount);
 * contents.forEach(news => {
 *   console.log(news.title);
 * });
 * ```
 */
export const getNews = async (
  page = 1,
  limit = 10,
  categoryId?: string,
) => {
  try {
    const response = await axios.get<{
      contents: Blog[];
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
 * 指定されたニュース記事の詳細情報を取得します。
 *
 * @param {string} contentId - ニュース記事のユニークなID
 * @returns {Promise<Blog | null>} - ニュース記事の詳細情報、エラー時はnullを返します
 *
 * @example
 * ```
 * const newsDetail = await getNewsDetail('news-id-123');
 * if (newsDetail) {
 *   console.log('ニュースタイトル:', newsDetail.title);
 * } else {
 *   console.error('ニュース記事が見つかりません');
 * }
 * ```
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
