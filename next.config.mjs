/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 允许开发环境跨域访问
  allowedDevOrigins: [
    'http://47.253.14.78:3000',
    'http://localhost:3000',
  ],
};

export default nextConfig;
