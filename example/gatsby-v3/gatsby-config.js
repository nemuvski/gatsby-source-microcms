/**
 * Config APIs
 *
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/}
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/**
 * 環境変数を展開
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config({
  path: path.resolve(__dirname, '..', '.env.local'),
})

const config = {
  polyfill: false,

  plugins: [
    {
      resolve: '../../',
      options: {
        apiKey: process.env.GATSBY_MICROCMS_API_KEY,
        serviceId: process.env.GATSBY_MICROCMS_SERVICE_ID,
        apis: [
          {
            endpoint: 'posts',
            format: 'list',
          },
          {
            endpoint: 'setting',
            format: 'object',
          },
        ],
      },
    },
  ],
}

module.exports = config
