/**
 * Config APIs
 *
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/}
 */

const dotenv = require('dotenv');
const path = require('path');

/**
 * 環境変数を展開
 */
dotenv.config({
  path: path.resolve(__dirname, '..', '.env.local'),
});

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
};

module.exports = config;
