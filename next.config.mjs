/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'img.shields.io'
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com'
        }]
    },

};

export default nextConfig;
