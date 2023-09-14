/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    sw: 'service-worker.js', // نام فایل Service Worker
  },
  // دیگر تنظیمات Next.js
})

const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "files.stripe.com"]
  }
}

module.exports = nextConfig
