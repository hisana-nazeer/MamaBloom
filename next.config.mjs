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
  value: `
    default-src 'self';
    script-src 'self' https://www.gstatic.com https://www.googleapis.com;
    connect-src 'self' https://www.googleapis.com https://firebase.googleapis.com https://*.firebaseio.com;
    img-src 'self' data:;
    style-src 'self' 'unsafe-inline';
  `.replace(/\n/g, ""),
}

        ],
      },
    ];
  },
};
