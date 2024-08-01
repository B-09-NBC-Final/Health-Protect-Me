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
<<<<<<< HEAD
      {
        hostname: 'lh3.googleusercontent.com'
      }
=======
      // {
      //   hostname: 'lh3.googleusercontent.com'
      // }
>>>>>>> 444a35ab69c1db6e2ba2294509447d06cf41b3ea
    ]
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  }
};

export default nextConfig;
