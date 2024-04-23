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
        },
        {
            protocol: 'http',
            hostname: 'localhost'
        },
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com'
        }
        ]
    },

};

export default nextConfig;
