/**
 * @file
 * このファイルは、ニュース記事の概要を表示するCardNewsコンポーネントを提供します。
 * 各ニュースカードにはタイトル、説明、日付が表示され、詳細ページへのリンクが含まれます。
 */

import React from 'react';
import Link from 'next/link';

/**
 * CardNewsコンポーネントに渡されるプロパティの型定義
 * @typedef {Object} CardNewsProps
 * @property {string} title - カードのタイトル
 * @property {string} description - カードの説明文
 * @property {string} date - カードに表示する日付
 * @property {string} id - ニュース詳細ページへのリンクに使用されるID
 * @property {string} category - カードのカテゴリ。フィルタリングやソートに使用されます。
 */
interface CardNewsProps {
  title: string;
  description: string;
  date: string;
  id: string;
  category: string;
}

/**
 * ニュースを表示するためのCardNewsコンポーネント
 * タイトル、説明、日付をボーダー付きのカードで表示し、詳細ページへのリンクを提供します。
 *
 * @param {CardNewsProps} props - CardNewsコンポーネントに渡されるプロパティ
 * @returns {JSX.Element} 表示するカードのJSX要素
 *
 * @example
 * ```jsx
 * <CardNews
 *   title="最新ニュース"
 *   description="これは最新ニュースの概要です。"
 *   date="2024-09-29"
 *   id="news-001"
 *   category="テクノロジー"
 * />
 * ```
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
