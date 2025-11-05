/** @type {import('next').NextConfig} */
const nextConfig = {
  // Retirer 'output: export' pour utiliser ISR au lieu d'export statique complet
  // Cela permet de générer les pages à la demande et éviter les erreurs 429
  eslint: {
    ignoreDuringBuilds: true,
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
  // Headers pour gérer le cache intelligemment
  async headers() {
    return [
      {
        // Pour tous les fichiers JS/CSS avec hash (ex: 864-70482cadf61852bb.js)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache 1 an (car hash change)
          },
        ],
      },
      {
        // Pour les pages HTML - toujours vérifier si nouvelle version
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate', // Toujours vérifier
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
