/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/mymoltbot',
  // 允许开发环境跨域访问
  allowedDevOrigins: [
    'http://47.253.14.78:3001',
    'http://localhost:3001',
  ],
};

export default nextConfig;
