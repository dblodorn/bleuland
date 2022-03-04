const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

const withVanillaExtract = createVanillaExtractPlugin()

module.exports = withVanillaExtract({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  future: {
    webpack5: true,
  },
})
