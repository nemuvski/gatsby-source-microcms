import type { GatsbyCache } from 'gatsby';

const mockGatsbyCache = (): GatsbyCache => {
  const cache = new Map();

  return {
    name: Date.now().toString(),
    directory: Date.now().toString(),
    async get(key) {
      return cache.get(key);
    },
    async set(key, value) {
      cache.set(key, value);
      return value;
    },
    async del(key) {
      cache.delete(key);
    },
  };
};

export { mockGatsbyCache };
