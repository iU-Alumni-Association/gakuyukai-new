import Image from "next/image";

type ListItemProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

const ListItem = ({
  title,
  description,
  imageSrc,
  imageAlt,
}: ListItemProps) => {
  return (
    <div className="bg-background rounded-3xl p-6">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          width={400}
          height={100}
          layout="responsive"
          objectFit="contain"
        />
      )}
      <h3 className="text-h3 sm:text-h3Sm font-semibold mt-4 text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default ListItem;
