/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ok pour ne pas bloquer le déploiement sur erreurs ESLint
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thesportsdb.com',
      },
    ],
  },

  // ✅ Headers pour contrôle intelligent du cache
  async headers() {
    return [
      {
        // 🧩 Fichiers statiques compilés avec hash (Next.js les versionne automatiquement)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // OK : cache long car nom change si fichier change
          },
        ],
      },
      {
        // 🧠 Pages dynamiques ou statiques HTML — forcer vérification
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate', // 🔥 plus sûr que public,max-age=0
          },
        ],
      },
      {
        // 📦 API routes : léger cache possible si tu veux
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=60, stale-while-revalidate=30', // ISR côté Vercel (si applicable)
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
