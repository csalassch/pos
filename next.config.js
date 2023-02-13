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
  },
  images: {
    domains: ['firebasestorage.googleapis.com','fastly.picsum.photos','picsum.photos'],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'firebasestorage.googleapis.com',
  //       port: '',
  //       pathname: '/v0/b/panellicencia.appspot.com/o/images%2FiconVentas.png?alt=media&token=f4ef9eaf-92f9-4d16-997f-1a0f97c1719f',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
