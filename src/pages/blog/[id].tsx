export const runtime = 'experimental-edge';

import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  getBlogDetail,
  getBlogs,
} from '@/lib/microcms';
import type { Blog } from '@/lib/types';
import BlogHeader from '@/components/BlogHeader';
import Footer from '@/components/Footer';
import LoadingBar from '@/components/LoadingBar';
import Breadcrumbs from '@/components/Breadcrumbs';

// Define the props for the BlogPage component
type BlogProps = {
  blog: Blog | null;
};

/**
 * BlogPage Component Renders the blog page with
 * dynamic content.
 *
 * @param {BlogProps} props - The blog data passed
 *   as props.
 * @returns {JSX.Element} - The rendered blog
 *   page.
 */
const BlogPage = ({ blog }: BlogProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(
    router.isFallback,
  );

  // Handle loading state based on fallback
  useEffect(() => {
    if (!router.isFallback) {
      setLoading(false);
    }
  }, [router.isFallback]);

  // Display loading screen while fetching data
  if (loading) {
    return (
      <>
        <LoadingBar loading={loading} />
        <div className="flex min-h-screen items-center justify-center p-4">
          <p className="text-p text-gray-600 sm:text-pSm">
            Loading...
          </p>
        </div>
      </>
    );
  }

  // Return null if no blog data is available
  if (!blog) {
    return null;
  }

  return (
    <>
      <LoadingBar loading={loading} />
      <BlogHeader />
      <Breadcrumbs />
      <div className="container mx-auto mt-8 min-h-screen p-4 px-4 pb-12">
        <Head>
          <title>{blog.title}</title>
          <meta
            name="description"
            content={blog.description}
          />
          <meta
            name="keywords"
            content={blog.category?.name || ''}
          />
        </Head>

        {/* Blog Title */}
        <h1 className="mb-6 text-h1 font-bold text-gray-900 sm:text-h1Sm">
          {blog.title}
        </h1>

        {/* Eyecatch Image */}
        {blog.eyecatch && (
          <div className="mb-8 flex justify-center">
            <img
              src={blog.eyecatch.url}
              alt={blog.title}
              className="w-full max-w-3xl object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

/**
 * GetStaticPaths - Generate the dynamic paths for
 * blog pages. Fetches the list of blog IDs to
 * create the paths.
 *
 * @returns {Promise<{
 *   paths: { params: { id: string } }[];
 *   fallback: boolean;
 * }>}
 *   - The dynamic paths and fallback setting.
 */
export const getStaticPaths: GetStaticPaths =
  async () => {
    const data = await getBlogs();
    const paths = data.contents.map((blog) => ({
      params: { id: blog.id },
    }));

    return { paths, fallback: true };
  };

/**
 * GetStaticProps - Fetch blog data based on the
 * provided ID.
 *
 * @param {Object} context - The Next.js context
 *   object containing route parameters.
 * @returns {Promise<
 *   | { props: BlogProps; revalidate: number }
 *   | { notFound: true }
 * >}
 *   - The blog data or 404 if not found.
 */
export const getStaticProps: GetStaticProps =
  async (context) => {
    const { id } = context.params!;
    const blog = await getBlogDetail(
      id as string,
    );

    // Log the fetched blog data for debugging purposes
    console.log('Blog data:', blog);

    // If no blog is found, return 404
    if (!blog) {
      return {
        notFound: true,
      };
    }

    // Return the blog data as props and set revalidation interval
    return {
      props: {
        blog,
      },
      revalidate: 1,
    };
  };

export default BlogPage;
