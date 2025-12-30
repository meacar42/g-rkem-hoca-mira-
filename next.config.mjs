/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push('iyzipay')
        }
        return config
    },
}

export default nextConfig
