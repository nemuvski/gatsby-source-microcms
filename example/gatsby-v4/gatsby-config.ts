/**
 * Config APIs
 *
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/}
 */

import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';
import { resolve } from 'node:path';

/**
 * 環境変数を展開
 */
dotenv.config({
  path: resolve(__dirname, '..', '.env.local'),
});

const config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  trailingSlash: 'always',
  polyfill: false,
  graphqlTypegen: {
    typesOutputPath: 'src/__generated__/gatsby-types.d.ts',
    generateOnBuild: true,
  },

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

export default config;
