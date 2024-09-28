// Type definition for MicroCMSImage
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

// Type definition for MicroCMSDate
export type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// Type definition for Category
export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  explanation?: string; // Optional field for category explanation
  image?: MicroCMSImage; // Optional field for category image
};

// Type definition for Blog
export type Blog = {
  id: string;
  date: string; // Date of the blog post
  title: string; // Title of the blog post
  description: string; // Short description of the blog post
  content: string; // Main content of the blog post
  eyecatch?: MicroCMSImage; // Optional field for blog eyecatch image
  category: Category; // Associated category
} & MicroCMSDate; // Inherits common date fields from MicroCMSDate
