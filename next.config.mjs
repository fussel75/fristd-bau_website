import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Kein standalone-Output: Payload's push:true (drizzle-kit) und diverse CLI-
  // Tools brauchen die volle node_modules zur Runtime. Groesseres Image (~450MB
  // statt ~200MB) aber deutlich weniger Fallstricke.
  serverExternalPackages: [
    'libsql',
    '@libsql/client',
    '@libsql/linux-x64-musl',
    'sharp',
  ],
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        // Auf allen Antworten. Traefik setzt zusaetzlich HSTS.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), camera=(), microphone=(), payment=(), usb=()',
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
