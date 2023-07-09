import { describe, test, expect } from 'vitest';
import { ApiFormat, fillDefaultPluginOptions } from '../plugin-options';

describe('plugin-options.ts', () => {
  test('fillDefaultPluginOptions()', () => {
    const serviceId = 'test';
    const apiKey = '__this_is_api_key__';

    expect(
      fillDefaultPluginOptions({
        serviceId,
        apiKey,
        apis: [{ endpoint: 'posts' }, { endpoint: 'blogs', query: { limit: 10 } }],
      })
    ).toEqual({
      serviceId,
      apiKey,
      apis: [
        { endpoint: 'posts', type: 'posts', format: ApiFormat.List, query: {} },
        { endpoint: 'blogs', type: 'blogs', format: ApiFormat.List, query: { limit: 10 } },
      ],
    });

    expect(
      fillDefaultPluginOptions({
        serviceId,
        apiKey,
        apis: [
          { endpoint: 'posts', type: 'post', format: ApiFormat.List },
          { endpoint: 'setting', format: ApiFormat.Object },
        ],
      })
    ).toEqual({
      serviceId,
      apiKey,
      apis: [
        { endpoint: 'posts', type: 'post', format: ApiFormat.List, query: {} },
        { endpoint: 'setting', type: 'setting', format: ApiFormat.Object, query: {} },
      ],
    });
  });
});
