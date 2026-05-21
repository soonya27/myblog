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
        },
        {
            protocol: 'https',
            hostname: 'youtu.be'
        },
        {
            protocol: 'https',
            hostname: '*.supabase.co',
            pathname: '/storage/v1/object/public/**'
        }
        ]
    },

};

export default nextConfig;
