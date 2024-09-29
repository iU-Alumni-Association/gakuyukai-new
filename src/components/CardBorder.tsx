/**
 * @file
 * CardBorderコンポーネントを定義します。このコンポーネントは、
 * タイトル、説明、日付を表示するボーダー付きカードを提供し、
 * ニュース詳細ページへのリンクとして機能します。
 */

import React from 'react';
import Link from 'next/link';

/**
 * CardBorderコンポーネントのプロパティを定義するインターフェース。
 * @property {string} title - カードのタイトル。
 * @property {string} description - カードの説明。
 * @property {string} date - カードに表示される日付。
 * @property {string} id - ニュース詳細ページへのリンクに使用されるID。
 */
interface CardBorderProps {
  title: string;
  description: string;
  date: string;
  id: string; // ニュース詳細ページへのリンクに使用されるID
}

/**
 * @description
 * CardBorderコンポーネントは、タイトル、説明、および日付を含むボーダー付きカードを表示します。
 * 提供されたIDを使用して、ニュース詳細ページにリンクします。
 * @param {CardBorderProps} props - CardBorderコンポーネントのプロパティ。
 * @returns {JSX.Element} レンダリングされたカードコンポーネント。
 *
 * @example
 * <CardBorder
 *   title="ニュースのタイトル"
 *   description="ニュースの概要説明"
 *   date="2024-09-29"
 *   id="12345"
 * />
 */
const CardBorder: React.FC<CardBorderProps> = ({
  title,
  description,
  date,
  id,
}) => {
  return (
    <Link
      href={`/news/${id}`}
      passHref
      className="card--border hover:border-link hover:text-link block h-full rounded-xl border border-paragraph p-4 text-gray-800 transition-colors focus-visible:outline-none focus-visible:outline-[0.125rem] focus-visible:outline-offset-[-0.125rem] focus-visible:outline-current"
    >
      <div className="">
        <h2 className="text-h2 font-semibold sm:text-base">
          {title}
        </h2>
        <p className="text-p sm:text-pSm">
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-p sm:text-pSm">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default CardBorder;
