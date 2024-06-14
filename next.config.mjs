/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *;",
          },
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({ test: /\.node$/, use: 'raw-loader' })

    if (!isServer) config.externals.push('canvas')
    return config
  },
}

export default nextConfig
