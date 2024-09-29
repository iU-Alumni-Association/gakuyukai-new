/**
 * @file
 * このファイルは、Reactコンポーネント`Card`の実装を提供します。
 * このコンポーネントは、画像とテキストを表示するカードUIを提供します。
 * 画像がない場合は、テキストが中央に表示されます。
 */

import Image from 'next/image';
import React from 'react';

/**
 * `CardProps`インターフェースは、カードコンポーネントのプロパティを定義します。
 * @property {string} title - カードのタイトル
 * @property {string} description - カードの説明
 * @property {string} [imageUrl] - カードに表示する画像のURL（省略可能）
 */
interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

/**
 * `Card`コンポーネントは、タイトル、説明、およびオプションの画像を持つリンク可能なカードを表示します。
 * @param {CardProps} props - カードのプロパティ
 * @returns {JSX.Element} レンダリングされたカード要素
 * @example
 * ```
 * <Card title="Sample Title" description="This is a description." imageUrl="/path/to/image.jpg" />
 * ```
 */
const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <a
      href="#"
      className="group block h-full rounded-xl p-4 text-gray-800 transition-colors hover:text-highlight focus-visible:outline-none focus-visible:outline-[0.125rem] focus-visible:outline-offset-[-0.125rem] focus-visible:outline-current"
    >
      <div className="overflow-hidden rounded-lg border border-gray-400 text-base font-normal">
        <div
          className="relative w-full"
          style={{
            paddingBottom: '56.25%', // 16:9のアスペクト比を保持するためのスタイル
          }}
        >
          {
            imageUrl ?
              /**
               * `Image`コンポーネントは、`imageUrl`が存在する場合に画像を表示します。
               * 画像はホバー時に拡大されます。
               */
              <Image
                src={imageUrl}
                alt={title}
                className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                layout="fill"
              />
              /**
               * `div`要素は、`imageUrl`がない場合に代替テキストを表示します。
               */
            : <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-200 text-h5Sm transition-all duration-300 ease-in-out group-hover:text-h5">
                <span className="text-center font-semibold text-gray-600">
                  {title}
                </span>
              </div>

          }
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-p font-semibold sm:text-pSm">
          {title}
        </h2>
        <p>{description}</p>
      </div>
    </a>
  );
};

export default Card;
