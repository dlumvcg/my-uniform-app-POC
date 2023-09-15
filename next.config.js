/* eslint-disable @typescript-eslint/no-var-requires */
const { parsed: localEnv } = require('dotenv').config({
  path: './.env.local',
});

const env = { ...process.env, ...localEnv };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    YOUTUBE_API_KEY: env.YOUTUBE_API_KEY,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*' }, // any image hosts are welcome
      { protocol: 'https', hostname: 'unresolved' }, // For cases where the data obtained are unresolved
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
};

module.exports = nextConfig;
