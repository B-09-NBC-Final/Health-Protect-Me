/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'pdgwrjxbqywcmuxwjqos.supabase.co',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
