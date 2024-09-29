import React from 'react';
import Link from 'next/link';

/**
 * Props for the CardNews component.
 *
 * @typedef {Object} CardNewsProps
 * @property {string} title - The title of the card.
 * @property {string} description - The description of the card.
 * @property {string} date - The date to be displayed on the card.
 * @property {string} id - The ID used for linking to the news detail page.
 * @property {string} category - The category of the card, used for sorting or filtering.
 */
interface CardNewsProps {
  title: string;
  description: string;
  date: string;
  id: string;
  category: string;
}

/**
 * CardNews component that displays a bordered card with a title, description, and date.
 * The card is linked to a news detail page using the provided ID.
 *
 * @param {CardNewsProps} props - The props for the CardNews component.
 * @returns {JSX.Element} The rendered card component.
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
