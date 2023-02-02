/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'esMX',
    locales: ["esMX", "en", "pt", "fr", "he"]
  },
  async redirects(){
    return [
      {
        source:"/",
        destination:"/views/login",
        permanent:true
      }
    ]
  }
}

module.exports = nextConfig
