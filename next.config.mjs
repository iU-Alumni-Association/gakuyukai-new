/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export const env = {
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
};

export default nextConfig;
