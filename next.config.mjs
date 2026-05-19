/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local /public images (default) + any added domains later
    remotePatterns: [],
    unoptimized: false,
  },
};

export default nextConfig;
