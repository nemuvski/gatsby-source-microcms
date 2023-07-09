import { defineConfig } from 'tsup';

const config = defineConfig({
  entry: {
    'gatsby-node': './src/gatsby-node/index.ts',
    index: './src/index.ts',
  },
  format: ['cjs', 'esm'],
  splitting: false,
  sourcemap: false,
  minify: false,
  clean: true,
  dts: true,
});

export default config;
