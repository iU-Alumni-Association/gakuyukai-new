import React from 'react';
import Link from 'next/link';

interface CardBorderProps {
  title: string;
  description: string;
  date: string;
  id: string; // ニュース詳細ページへのリンクに使用されるID
}

/**
 * CardBorderコンポーネント.
 *
 * タイトル、説明、および日付を含むボーダー付きカードを表示し、提供されたIDを使用してニュース詳細ページにリンクします。
 *
 * @remarks
 *   - `title`: カードのタイトルを表示します。
 *   - `description`: カードの説明を表示します。
 *   - `date`: カードに表示される日付をフォーマットします。
 *   - `id`: ニュース詳細ページへのリンクに使用される一意のIDです。
 *
 * @example
 *   <CardBorder
 *     title="ニュースのタイトル"
 *     description="ニュースの概要説明"
 *     date="2024-09-29"
 *     id="12345"
 *   />;
 *
 * @param {CardBorderProps} props -
 *   CardBorderコンポーネントのプロパティ。
 * @returns {JSX.Element} レンダリングされたカードコンポーネント。
 * @source
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
      className="card--border block h-full rounded-xl border border-paragraph p-4 text-gray-800 transition-colors hover:border-link hover:text-link focus-visible:outline-none focus-visible:outline-[0.125rem] focus-visible:outline-offset-[-0.125rem] focus-visible:outline-current"
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
