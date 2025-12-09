/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
    domains: ['cdn.outback.com.br', 'www.outback.com.br', 'static.ifood-static.com.br'],
  },
};

export default nextConfig;