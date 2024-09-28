import React from 'react';
import Link from 'next/link';
import { Blog } from '@/lib/types';

interface BlogItemProps {
  blog: Blog;
}

/**
 * BlogItem component renders an individual blog post in a list.
 *
 * @param {Blog} blog - The blog data to display, including title, image, and description.
 * @returns {JSX.Element} - A styled list item for the blog.
 */
const BlogItem: React.FC<BlogItemProps> = ({ blog }) => (
  <li key={blog.id} className={`blog-item ${blog.eyecatch ? 'md:col-span-2' : 'md:col-span-1'}`}>
    <Link href={`/blog/${blog.id}`}>
      <div className="card group cursor-pointer transition-colors duration-300 hover:bg-gray-100">
        {/* Layout changes based on screen size: vertical on mobile, horizontal on desktop */}
        <div className={`card-main flex flex-col ${blog.eyecatch ? 'md:flex-row' : ''} w-full`}>
          {/* Display eyecatch image if available */}
          {blog.eyecatch && (
            <img
              src={blog.eyecatch.url}
              alt={blog.title}
              className="card-image object-cover w-full md:w-1/2 h-48 px-5 md:h-auto max-h-[400px] aspect-[3/1]"
            />
          )}
          {/* Blog content (title, date, description) */}
          <div className={`${blog.eyecatch ? 'md:w-1/2' : 'w-full'} card-content p-4`}>
            <h2 className="card-title text-xl font-bold text-gray-900 group-hover:text-customBlue transition-colors">
              {blog.title}
            </h2>
            <p className="card-timestamp text-sm text-gray-500">
              {new Date(blog.publishedAt).toLocaleDateString()}
            </p>
            {/* Conditionally render blog description if available */}
            {blog.description && (
              <div className="mt-2">
                <p className="card-description text-gray-700 line-clamp-3">{blog.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
    {/* Separator if description exists */}
    {blog.description && <hr className="card-divider my-4 border-gray-300 mx-3" />}
  </li>
);

export default BlogItem;
