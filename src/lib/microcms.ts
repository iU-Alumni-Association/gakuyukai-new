// microcms.ts
import axios from 'axios';
import type { Blog, Category } from './types';

// Retrieve environment variables for API credentials
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const ENDPOINT = `https://${SERVICE_ID}.microcms.io/api/v1`;

// Validate that necessary environment variables are present
if (!SERVICE_ID) {
  throw new Error('NEXT_PUBLIC_SERVICE_ID is required');
}

if (!API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

/**
 * Fetch a list of blog posts from MicroCMS.
 *
 * @param {number} page - The current page number for pagination.
 * @param {number} limit - The number of blog posts to fetch per page.
 * @returns {Promise<{ contents: Blog[], totalCount: number }>} - A list of blogs and the total count.
 */
export const getBlogs = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get<{ contents: Blog[]; totalCount: number }>(`${ENDPOINT}/blog`, {
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
    console.error('Error fetching blogs:', error);
    return { contents: [], totalCount: 0 };
  }
};

/**
 * Fetch detailed information for a specific blog post.
 *
 * @param {string} contentId - The unique identifier of the blog post.
 * @returns {Promise<Blog | null>} - The blog post details, or null if an error occurs.
 */
export const getBlogDetail = async (contentId: string) => {
  try {
    const response = await axios.get<Blog>(`${ENDPOINT}/blog/${contentId}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    return null;
  }
};

/**
 * Fetch a list of all categories from MicroCMS.
 *
 * @returns {Promise<Category[]>} - A list of categories.
 */
export const getCategories = async () => {
  try {
    const response = await axios.get<{ contents: Category[] }>(`${ENDPOINT}/categories`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
    return response.data.contents;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Fetch a list of blog posts by category.
 *
 * @param {string} categoryId - The unique identifier of the category.
 * @param {number} page - The current page number for pagination.
 * @param {number} limit - The number of blog posts to fetch per page.
 * @returns {Promise<{ contents: Blog[], totalCount: number }>} - A list of blogs filtered by category and the total count.
 */
export const getBlogsByCategory = async (categoryId: string, page = 1, limit = 10) => {
  try {
    const response = await axios.get<{ contents: Blog[]; totalCount: number }>(`${ENDPOINT}/blog`, {
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
    console.error('Error fetching blogs by category:', error);
    return { contents: [], totalCount: 0 };
  }
};

/**
 * Fetch detailed information for a specific category.
 *
 * @param {string} categoryId - The unique identifier of the category.
 * @returns {Promise<Category | null>} - The category details, or null if an error occurs.
 */
export const getCategory = async (categoryId: string) => {
  try {
    const response = await axios.get<Category>(`${ENDPOINT}/categories/${categoryId}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

/**
 * Search for blog posts using a query string.
 *
 * @param {string} query - The search term to filter blog posts.
 * @param {number} page - The current page number for pagination.
 * @param {number} limit - The number of blog posts to fetch per page.
 * @returns {Promise<{ contents: Blog[], totalCount: number }>} - A list of blogs matching the query and the total count.
 */
export const getBlogsByQuery = async (query: string, page = 1, limit = 10) => {
  try {
    const response = await axios.get<{ contents: Blog[]; totalCount: number }>(`${ENDPOINT}/blog`, {
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
    console.error('Error fetching blogs by query:', error);
    return { contents: [], totalCount: 0 };
  }
};

/**
 * Fetch a list of news articles.
 *
 * @param {number} page - The current page number for pagination.
 * @param {number} limit - The number of news articles to fetch per page.
 * @returns {Promise<{ contents: Blog[], totalCount: number }>} - A list of news articles and the total count.
 */
export const getNews = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get<{ contents: Blog[]; totalCount: number }>(`${ENDPOINT}/news`, {
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
    console.error('Error fetching news:', error);
    return { contents: [], totalCount: 0 };
  }
};

/**
 * Fetch detailed information for a specific news article.
 *
 * @param {string} contentId - The unique identifier of the news article.
 * @returns {Promise<Blog | null>} - The news article details, or null if an error occurs.
 */
export const getNewsDetail = async (contentId: string) => {
  try {
    const response = await axios.get<Blog>(`${ENDPOINT}/news/${contentId}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return null;
  }
};
