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
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'hiltech-eg.com',
          },
        ],
        destination: 'https://www.hiltech-eg.com/:path*',
        permanent: true,
      },
      {
        source: '/product-page/:slug',
        destination: '/products-partners/:slug',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/products-partners',
        permanent: true,
      },
      {
        source: '/book-online',
        destination: '/rfq',
        permanent: true,
      },
      {
        source: '/cart-page',
        destination: '/rfq',
        permanent: true,
      },
      {
        source: '/thank-you-page',
        destination: '/rfq',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
