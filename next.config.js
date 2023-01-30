/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'esMX',
    locales: ["esMX", "en", "pt", "fr", "he"]
  }
}

module.exports = nextConfig
