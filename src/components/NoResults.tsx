import React from 'react';

interface NoResultsProps {
  query: string;
}

/**
 * NoResults コンポーネント
 * 指定された検索クエリに対して結果が見つからなかったことを表示します。
 *
 * @example
 *   ```
 *   <NoResults query="example query" />
 *   ```;
 *
 * @param {NoResultsProps} props - コンポーネントのプロパティ.
 * @returns {JSX.Element} 結果が見つからない旨を表示するJSX要素.
 * @source
 */
const NoResults: React.FC<NoResultsProps> = ({
  query,
}) => (
  <div className="no-results">
    <p>{`"${query}"に関連する結果が見つかりませんでした。`}</p>
  </div>
);

export default NoResults;
