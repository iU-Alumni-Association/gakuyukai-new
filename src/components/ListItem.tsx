import Image from 'next/image';

type ListItemProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * ListItem Component.
 *
 * This component renders a content block with an
 * optional image, a title, and a description.
 * It's designed with a modern card layout,
 * featuring smooth hover animations and a
 * responsive design.
 *
 * @param {string} title - The title of the list
 *   item.
 * @param {string} description - A brief
 *   description or content for the list item.
 * @param {string} [imageSrc] - (Optional) The URL
 *   of the image to be displayed.
 * @param {string} [imageAlt] - (Optional)
 *   Alternative text for the image.
 * @returns A styled content card component with
 *   an image, title, and description.
 */
const ListItem = ({
  title,
  description,
  imageSrc,
  imageAlt,
}: ListItemProps) => {
  return (
    <div className="transform rounded-3xl bg-background p-6 shadow-lg transition-shadow duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      {/* Render image if imageSrc is provided */}
      {imageSrc && (
        <div className="overflow-hidden rounded-t-3xl">
          <Image
            src={imageSrc}
            alt={imageAlt || title} // Use title as alt text if imageAlt is not provided
            width={400}
            height={200} // Fixed height for consistent image display
            layout="responsive"
            objectFit="cover" // Ensures the image covers the container
            className="rounded-t-3xl"
          />
        </div>
      )}

      {/* Text block containing the title and description */}
      <div className="mt-4">
        <h3 className="text-h3 font-semibold text-gray-900 sm:text-h3Sm">
          {title} {/* Title of the list item */}
        </h3>
        <p className="mt-2 text-lg leading-relaxed text-gray-600">
          {description}{' '}
          {/* Description or content of the list item */}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
