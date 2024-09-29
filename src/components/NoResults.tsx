import React from 'react';

interface NoResultsProps {
  query: string;
}

/**
 * @file
 * このファイルは、検索結果が見つからなかった場合に表示されるコンポーネントを提供します。
 * 検索クエリに基づいて、該当する結果がない旨を表示します。
 */

/**
 * NoResults コンポーネント
 * 指定された検索クエリに対して結果が見つからなかったことを表示します。
 *
 * @param {string} query - 結果が見つからなかった検索クエリ
 * @returns {JSX.Element} 結果が見つからない旨を表示するJSX要素
 * @example
 * ```
 * <NoResults query="example query" />
 * ```
 */
const NoResults: React.FC<NoResultsProps> = ({
  query,
}) => (
  <div className="no-results">
    <p>{`"${query}"に関連する結果が見つかりませんでした。`}</p>
  </div>
);

export default NoResults;
