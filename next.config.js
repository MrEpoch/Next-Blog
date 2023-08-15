/** @type {import('next').NextConfig} */
    const nextConfig = {
        experimental: {
            appDir: true,
            serverActions: true,
            serverComponentsExternalPackages: ['bcrypt'],
        }
    }

module.exports = nextConfig
