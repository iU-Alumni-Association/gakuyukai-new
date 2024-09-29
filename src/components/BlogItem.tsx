/**
 * @file
 * このファイルは、ブログ一覧に表示される個々のブログポストを
 * 表示するコンポーネントの実装を提供します。
 * `BlogItem` コンポーネントは、ブログのタイトル、説明、および画像を
 * `Card` コンポーネントを介して表示します。
 */

import React from 'react';
import Link from 'next/link';
import { Blog } from '@/lib/types';
import Card from './Card'; // 既存のCardコンポーネントをインポート

interface BlogItemProps {
  blog: Blog;
}

/**
 * `BlogItem` コンポーネントは、ブログポストを一覧として表示します。
 * ブログのタイトル、画像、説明を表示し、リンクから該当ブログに移動できます。
 *
 * @param {Blog} blog - 表示するブログデータ。
 *   タイトル、画像、説明などが含まれます。
 * @returns {JSX.Element} スタイリングされたブログリストのアイテムを返します。
 *
 * @example
 * ```tsx
 * const blog = {
 *   id: '1',
 *   title: '新しいNext.jsの機能',
 *   description: 'Next.jsの最新バージョンの新機能について...',
 *   eyecatch: { url: '/images/blog1.jpg' }
 * };
 * <BlogItem blog={blog} />
 * ```
 */
const BlogItem: React.FC<BlogItemProps> = ({
  blog,
}) => (
  <li key={blog.id} className="my-6">
    <Link href={`/blog/${blog.id}`}>
      <Card
        title={blog.title}
        description={blog.description || ''}
        imageUrl={blog.eyecatch?.url}
      />
    </Link>
  </li>
);

export default BlogItem;
