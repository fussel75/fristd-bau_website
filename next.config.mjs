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
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
