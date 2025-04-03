/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 rok - optymalizacja cache'owania obrazów
  },
  // Optymalizacja dla produkcji
  reactStrictMode: true,
  // Optymalizacja kompresji
  compress: true,
  // Optymalizacja dla wyszukiwarek
  poweredByHeader: false,
  // Strategia traktowania skryptów inline - pomaga z Core Web Vitals
  experimental: {
    // Usuwa zbędny JS z bundle'a
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // Optymalizacja podziału CSS na chunki
    cssChunking: true,
  },
  // Optymalizacja nagłówków
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig

