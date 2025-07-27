// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)", // all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com;",
          },
        ],
      },
    ];
  },
};
