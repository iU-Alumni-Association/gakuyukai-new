import React from 'react';

interface NoResultsProps {
  query: string;
}

/**
 * NoResults Component Displays a message
 * indicating no search results were found for the
 * given query.
 *
 * @param {string} query - The search term that
 *   returned no results.
 * @returns {JSX.Element} - A JSX element
 *   displaying the no results message.
 */
const NoResults: React.FC<NoResultsProps> = ({
  query,
}) => (
  <div className="no-results">
    <p>{`"${query}"に関連する結果が見つかりませんでした。`}</p>
  </div>
);

export default NoResults;
