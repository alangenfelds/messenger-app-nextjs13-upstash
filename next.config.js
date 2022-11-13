/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'scontent.frix1-1.fna.fbcdn.net',
      'platform-lookaside.fbsbx.com',
    ],
  },
  experimental: {
    appDir: true,
  },
};
