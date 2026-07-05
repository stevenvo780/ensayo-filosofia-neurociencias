/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/slides",
        destination: "/slides/0",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
