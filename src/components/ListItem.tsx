import Image from 'next/image';

type ListItemProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * @file
 * ListItemコンポーネントを提供するファイルです。
 * このコンポーネントは、オプションの画像、タイトル、説明を持つモダンなカードレイアウトを実現しています。
 * レスポンシブデザインで、ホバー時にスムーズなアニメーションが表示されます。
 */

/**
 * ListItemコンポーネント。
 *
 * このコンポーネントは、画像、タイトル、説明を表示するコンテンツブロックをレンダリングします。
 * モダンなカードレイアウトを特徴としており、ホバー時のアニメーションやレスポンシブデザインが組み込まれています。
 *
 * @param {string} title - リストアイテムのタイトル。
 * @param {string} description - リストアイテムの説明またはコンテンツ。
 * @param {string} [imageSrc] - （オプション）表示される画像のURL。
 * @param {string} [imageAlt] - （オプション）画像の代替テキスト。指定がない場合はタイトルが使用されます。
 * @returns {JSX.Element} 画像、タイトル、説明を持つスタイルされたコンテンツカード。
 *
 * @example
 * ```
 * <ListItem
 *   title="サンプルタイトル"
 *   description="これは説明文です。"
 *   imageSrc="https://example.com/image.jpg"
 *   imageAlt="サンプル画像"
 * />
 * ```
 */
const ListItem = ({
  title,
  description,
  imageSrc,
  imageAlt,
}: ListItemProps): JSX.Element => {
  return (
    <div className="transform rounded-3xl bg-background p-6 shadow-lg transition-shadow duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      {/* 画像が提供されている場合のみレンダリング */}
      {imageSrc && (
        <div className="overflow-hidden rounded-t-3xl">
          <Image
            src={imageSrc}
            alt={imageAlt || title} // imageAltが指定されていない場合は、タイトルを代替テキストとして使用
            width={400}
            height={200} // 一貫した表示のため固定高さを指定
            layout="responsive"
            objectFit="cover" // 画像がコンテナ全体をカバーするように調整
            className="rounded-t-3xl"
          />
        </div>
      )}

      {/* タイトルと説明を含むテキストブロック */}
      <div className="mt-4">
        <h3 className="text-h3 font-semibold text-gray-900 sm:text-h3Sm">
          {title} {/* リストアイテムのタイトル */}
        </h3>
        <p className="mt-2 text-lg leading-relaxed text-gray-600">
          {description}{' '}
          {/* リストアイテムの説明またはコンテンツ */}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
