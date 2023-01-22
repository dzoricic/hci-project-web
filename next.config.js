/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader",
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  }
}

module.exports = nextConfig
