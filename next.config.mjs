import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Native Packages nicht bundlen - sie werden zur Runtime aus node_modules
  // resolved. libsql hat platformspezifische .node-Binaries, sharp Prebuilds -
  // beide funktionieren nur wenn sie extern bleiben.
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
