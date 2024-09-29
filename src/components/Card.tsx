import Image from 'next/image';
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

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
            paddingBottom: '56.25%',
          }}
        >
          {' '}
          {imageUrl ?
            <Image
              src={imageUrl}
              alt={title}
              className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              layout="fill"
            />
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
