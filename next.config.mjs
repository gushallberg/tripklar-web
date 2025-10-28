/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is default in Next.js 14 — no need for experimental.appDir
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
  },
  // lägg ev. andra giltiga inställningar här
};

export default nextConfig;
