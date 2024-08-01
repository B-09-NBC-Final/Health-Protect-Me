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
        hostname: 'qdtbndpvityeryaniyfj.supabase.co',
        pathname: '/**'
      },

      {
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  }
};

export default nextConfig;
