import { setupServer } from 'msw/node';
import { describe, test, expect, vi, afterAll, afterEach, beforeAll } from 'vitest';
import { sourceNodes } from '../../gatsby-node';
import { createMockSourceNodesArgs } from '../_utils/mock-source-nodes';
import type { MicroCMSPluginOptions } from '../../plugin-options';
import { ApiFormat } from '../../plugin-options';
import {
  mockApiKey,
  mockApiServerEndpointHandlers,
  mockApiServerEndpoints,
  mockResponseListPostsPayload,
  mockResponseObjectSomePayload,
  mockServiceId,
  mockTotalNumPosts,
} from '../_utils/mock-api-server';

describe('gatsby-node/source-nodes.ts', () => {
  const __sourceNodesArgs = createMockSourceNodesArgs();
  const __sourceNodes = async (options: MicroCMSPluginOptions) => {
    // @ts-ignore: sourceNodesの型警告回避
    await sourceNodes(__sourceNodesArgs, { plugins: [], ...options }, () => {
      // noop
    });
  };

  describe('sourceNodes()', () => {
    const server = setupServer(...mockApiServerEndpointHandlers);
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('list posts - 200', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.list.postsMany }],
      };
      const createNodeSpy = vi.spyOn(__sourceNodesArgs.actions, 'createNode');
      await __sourceNodes(pluginOptions);
      const checkContents = mockResponseListPostsPayload({ offset: 0, limit: mockTotalNumPosts }).contents;
      for (const res of checkContents) {
        expect(createNodeSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            ...res,

            sortIndex: expect.any(Number),
            id: expect.any(String),
            listPostsManyId: res.id,
            parent: null,
            children: expect.any(Array),
            internal: expect.objectContaining({
              owner: undefined,
              type: 'MicrocmsListPostsMany',
              content: expect.any(String),
              contentDigest: expect.any(String),
            }),
          })
        );
      }
    });

    test('list posts (type: post) - 200', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.list.postsMany, type: 'post' }],
      };
      const createNodeSpy = vi.spyOn(__sourceNodesArgs.actions, 'createNode');
      await __sourceNodes(pluginOptions);
      const checkContents = mockResponseListPostsPayload({ offset: 0, limit: mockTotalNumPosts }).contents;
      for (const res of checkContents) {
        expect(createNodeSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            ...res,

            sortIndex: expect.any(Number),
            id: expect.any(String),
            postId: res.id,
            parent: null,
            children: expect.any(Array),
            internal: expect.objectContaining({
              owner: undefined,
              type: 'MicrocmsPost',
              content: expect.any(String),
              contentDigest: expect.any(String),
            }),
          })
        );
      }
    });

    test('list posts - 200 empty', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.list.postsEmpty }],
      };
      const createNodeSpy = vi.spyOn(__sourceNodesArgs.actions, 'createNode');
      await __sourceNodes(pluginOptions);
      // 空の場合はcreateNodeは実行されない
      expect(createNodeSpy).not.toHaveBeenCalled();
    });

    test('list posts - 200 invalid response', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.list.postsInvalid }],
      };
      await expect(__sourceNodes(pluginOptions)).rejects.toThrowError();
    });

    test('list posts - 404', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.list.notFound }],
      };
      await expect(__sourceNodes(pluginOptions)).rejects.toThrowError();
    });

    test('object some - 200', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.object.some, format: ApiFormat.Object }],
      };
      const createNodeSpy = vi.spyOn(__sourceNodesArgs.actions, 'createNode');
      await __sourceNodes(pluginOptions);
      expect(createNodeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockResponseObjectSomePayload,

          sortIndex: undefined,
          id: expect.any(String),
          parent: null,
          children: expect.any(Array),
          internal: expect.objectContaining({
            owner: undefined,
            type: 'MicrocmsObjectSome',
            content: expect.any(String),
            contentDigest: expect.any(String),
          }),
        })
      );
    });

    test('object some (type: some) - 200', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.object.some, type: 'some', format: ApiFormat.Object }],
      };
      const createNodeSpy = vi.spyOn(__sourceNodesArgs.actions, 'createNode');
      await __sourceNodes(pluginOptions);
      expect(createNodeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockResponseObjectSomePayload,

          sortIndex: undefined,
          id: expect.any(String),
          parent: null,
          children: expect.any(Array),
          internal: expect.objectContaining({
            owner: undefined,
            type: 'MicrocmsSome',
            content: expect.any(String),
            contentDigest: expect.any(String),
          }),
        })
      );
    });

    test('object some - 404', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [{ endpoint: mockApiServerEndpoints.object.notFound, format: ApiFormat.Object }],
      };
      await expect(__sourceNodes(pluginOptions)).rejects.toThrowError();
    });

    test('invalid format', async () => {
      const pluginOptions: MicroCMSPluginOptions = {
        serviceId: mockServiceId,
        apiKey: mockApiKey,
        apis: [
          {
            // formatの指定内容でエラーになるため、ここはダミーの値を入れる
            endpoint: '__NONE__',
            // @ts-ignore: invalid format
            format: 'UNKNOWN',
          },
        ],
      };
      await expect(__sourceNodes(pluginOptions)).rejects.toThrowError();
    });
  });
});
