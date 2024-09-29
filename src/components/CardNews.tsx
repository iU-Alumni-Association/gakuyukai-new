import React from 'react';
import Link from 'next/link';

interface CardNewsProps {
  title: string;
  description: string;
  date: string;
  id: string;
  category: string;
}

/**
 * CardNewsコンポーネントは、ニュース記事の概要を表示します。
 *
 * タイトル、説明、日付、カテゴリを表示し、詳細ページへのリンクを提供します。
 *
 * @example
 *   ```tsx
 *   <CardNews
 *     title="最新ニュース"
 *     description="これは最新ニュースの概要です。"
 *     date="2024-09-29"
 *     id="news-001"
 *     category="テクノロジー"
 *   />
 *   ```;
 *
 * @returns {JSX.Element} 表示するニュースカードのJSX要素.
 * @source
 */

const CardNews: React.FC<CardNewsProps> = ({
  title,
  description,
  date,
  id,
  category,
}) => {
  return (
    <Link
      href={`/news/${id}`}
      passHref
      className="block h-full rounded-xl border border-paragraph bg-secondary p-4 text-gray-800 transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:outline-[0.125rem] focus-visible:outline-offset-[-0.125rem] focus-visible:outline-current"
    >
      <div>
        <p className="mb-2 text-xs text-gray-500">
          {category}
        </p>
        <h3 className="mb-2 text-h3 font-semibold sm:text-h3Sm">
          {title}
        </h3>
        <p className="mb-2 text-p text-gray-600 sm:text-pSm">
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-p sm:text-pSm">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default CardNews;
