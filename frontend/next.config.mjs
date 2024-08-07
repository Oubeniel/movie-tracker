/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "m.media-amazon.com"],
        deviceSizes: [576, 768, 992, 1200, 1400],
    }
};

export default nextConfig;