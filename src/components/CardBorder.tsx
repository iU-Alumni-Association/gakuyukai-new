import React from 'react';
import Link from 'next/link';

/**
 * Props for the CardBorder component.
 *
 * @typedef {Object} CardBorderProps
 * @property {string} title - The title of the card.
 * @property {string} description - The description of the card.
 * @property {string} date - The date to be displayed on the card.
 * @property {string} id - The ID used for linking to the news detail page.
 */
interface CardBorderProps {
  title: string;
  description: string;
  date: string;
  id: string; // The ID for linking to the news detail page
}

/**
 * CardBorder component that displays a bordered card with a title, description, and date.
 * The card is linked to a news detail page using the provided ID.
 *
 * @param {CardBorderProps} props - The props for the CardBorder component.
 * @returns {JSX.Element} The rendered card component.
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
