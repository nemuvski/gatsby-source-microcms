import { setupServer } from 'msw/node';
import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { fetchListData, fetchObjectData } from '../fetch-data';
import { ApiFormat } from '../plugin-options';
import {
  mockApiKey,
  mockApiServerEndpointHandlers,
  mockApiServerEndpoints,
  mockResponseObjectSomePayload,
  mockServiceId,
} from './_utils/mock-api-server';

describe('fetch-data.ts', () => {
  const __draftKey = '__this-is-draft-key__';

  describe('fetchData()', () => {
    const server = setupServer(...mockApiServerEndpointHandlers);
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('list posts - 200', async () => {
      const response = await fetchListData({
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        api: {
          endpoint: mockApiServerEndpoints.list.postsMany,
          type: mockApiServerEndpoints.list.postsMany,
          format: ApiFormat.List,
          query: {
            draftKey: __draftKey,
            fields: 'id,title',
            limit: 1,
            offset: 0,
            filters: 'tag[exists]',
            depth: 1,
          },
        },
      });

      expect(response).toEqual({
        contents: expect.any(Array),
        limit: expect.any(Number),
        offset: expect.any(Number),
        totalCount: expect.any(Number),
      });
    });

    test('list posts - 404', async () => {
      await expect(() =>
        fetchListData({
          serviceId: mockServiceId,
          apiKey: mockApiKey,

          api: {
            endpoint: mockApiServerEndpoints.list.notFound,
            type: mockApiServerEndpoints.list.notFound,
            format: ApiFormat.List,
            query: {},
          },
        })
      ).rejects.toThrowError();
    });

    test('list posts - invalid api format', async () => {
      await expect(() =>
        fetchListData({
          serviceId: mockServiceId,
          apiKey: mockApiKey,

          api: {
            endpoint: mockApiServerEndpoints.list.postsMany,
            type: mockApiServerEndpoints.list.postsMany,
            format: ApiFormat.Object,
            query: {},
          },
        })
      ).rejects.toThrowError('Invalid api format: object');
    });

    test('object some - 200', async () => {
      const response = await fetchObjectData({
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        api: {
          endpoint: mockApiServerEndpoints.object.some,
          type: mockApiServerEndpoints.object.some,
          format: ApiFormat.Object,
          query: {
            draftKey: __draftKey,
            fields: 'id,title',
            limit: 10,
            offset: 10,
            filters: 'tag[exists]',
            depth: 2,
          },
        },
      });

      expect(response).toEqual(mockResponseObjectSomePayload);
    });

    test('object some - 404', async () => {
      await expect(() =>
        fetchObjectData({
          serviceId: mockServiceId,
          apiKey: mockApiKey,

          api: {
            endpoint: mockApiServerEndpoints.object.notFound,
            type: mockApiServerEndpoints.object.notFound,
            format: ApiFormat.Object,
            query: {},
          },
        })
      ).rejects.toThrowError();
    });

    test('object some - invalid api format', async () => {
      await expect(() =>
        fetchObjectData({
          serviceId: mockServiceId,
          apiKey: mockApiKey,

          api: {
            endpoint: mockApiServerEndpoints.object.some,
            type: mockApiServerEndpoints.object.some,
            format: ApiFormat.List,
            query: {},
          },
        })
      ).rejects.toThrowError('Invalid api format: list');
    });
  });
});
