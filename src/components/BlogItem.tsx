import React from 'react';
import Link from 'next/link';
import { Blog } from '@/lib/types';
import Card from './Card'; // 既存のCardコンポーネントをインポート

interface BlogItemProps {
  blog: Blog;
}

/**
 * BlogItem component renders an individual blog
 * post in a list with improved styling.
 *
 * @param {Blog} blog - The blog data to display,
 *   including title, image, and description.
 * @returns {JSX.Element} - A styled list item for
 *   the blog.
 */
const BlogItem: React.FC<BlogItemProps> = ({
  blog,
}) => (
  <li
    key={blog.id}
    className="my-6" // 横幅の調整クラスは削除
  >
    <Link href={`/blog/${blog.id}`}>
      <Card
        title={blog.title}
        description={blog.description || ''}
        imageUrl={blog.eyecatch?.url} // 画像がない場合、imageUrlを渡さない
      />
    </Link>
  </li>
);

export default BlogItem;
