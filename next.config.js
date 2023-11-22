/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SPOTIFY_API_KEY: process.env.SPOTIFY_API_KEY,
    SPOTIFY_USER_KEY: process.env.SPOTIFY_USER_KEY,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
};

module.exports = nextConfig;
