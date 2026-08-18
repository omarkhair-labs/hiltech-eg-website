/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/product-page/:slug',
        destination: '/products-partners/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
