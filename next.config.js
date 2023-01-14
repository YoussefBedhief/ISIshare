/** @type {import('next').NextConfig} */
const withVideos = require("next-videos")

module.exports = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
      "source.unsplash.com",
    ],
  },
}
