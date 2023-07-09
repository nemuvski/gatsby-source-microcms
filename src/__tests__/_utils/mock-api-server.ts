import { rest } from 'msw';
import type { MicroCMSObjectContent } from 'microcms-js-sdk';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

const mockServiceId = 'test';
const mockApiKey = '__this_is_api_key__';
const __version = 'v1';

const mockApiServerEndpoints = {
  list: {
    notFound: 'list__not-found',
    postsEmpty: 'list__posts-empty',
    postsMany: 'list__posts-many',
    postsInvalid: 'list__posts-invalid',
  },
  object: {
    notFound: 'object__not-found',
    some: 'object__some',
  },
};

const mockResponseObjectSomePayload: MicroCMSObjectContent & { show: boolean; omit: boolean } = {
  createdAt: '2023-07-06T06:20:00.000Z',
  updatedAt: '2023-07-06T06:20:00.000Z',
  publishedAt: '2023-07-06T06:20:00.000Z',
  revisedAt: '2023-07-06T06:20:00.000Z',
  show: false,
  omit: true,
};

const mockTotalNumPosts = 30;
const __posts: MicroCMSListResponse<{ title: string; body: string }>['contents'] = [...Array(mockTotalNumPosts)].map(
  (_, i) => ({
    id: `57eq9r_test${i + 1}`,
    createdAt: '2023-07-06T06:20:00.000Z',
    updatedAt: '2023-07-06T06:20:00.000Z',
    publishedAt: '2023-07-06T06:20:00.000Z',
    revisedAt: '2023-07-06T06:20:00.000Z',
    title: `テスト${i + 1}`,
    body: `<p>テスト内容${i + 1}です</p>`,
  })
);
const mockResponseListPostsPayload = (options: { offset: number; limit: number }) => {
  const payload: MicroCMSListResponse<{ title: string; body?: string }> = {
    totalCount: mockTotalNumPosts,
    offset: options.offset,
    limit: options.limit,
    contents: __posts.slice(options.offset, options.offset + options.limit),
  };
  return payload;
};

const mockApiServerEndpointHandlers = [
  /**
   * Endpoint handlers for list data
   */
  rest.get(
    `https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.notFound}`,
    (_, res, ctx) => {
      return res(ctx.status(404), ctx.json({ message: 'not found' }));
    }
  ),
  rest.get(
    `https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.postsEmpty}`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          totalCount: 0,
          offset: 0,
          limit: 10,
          contents: [],
        })
      );
    }
  ),
  rest.get(
    `https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.postsMany}`,
    (req, res, ctx) => {
      const offset = req.url.searchParams.get('offset');
      const limit = req.url.searchParams.get('limit');
      return res(
        ctx.status(200),
        ctx.json(
          mockResponseListPostsPayload({ offset: offset ? Number(offset) : 0, limit: limit ? Number(limit) : 10 })
        )
      );
    }
  ),
  rest.get(
    `https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.postsInvalid}`,
    (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          totalCount: 10,
          offset: 0,
          limit: 10,
          // 無効なレスポンスであることをテストしたいため、配列ではないものを設定
          contents: {},
        })
      );
    }
  ),

  /**
   * Endpoint handlers for object data
   */
  rest.get(
    `https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.object.notFound}`,
    (_, res, ctx) => {
      return res(ctx.status(404), ctx.json({ message: 'not found' }));
    }
  ),
  rest.get(
    `https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.object.some}`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockResponseObjectSomePayload));
    }
  ),
];

export {
  mockServiceId,
  mockApiKey,
  mockApiServerEndpoints,
  mockResponseObjectSomePayload,
  mockTotalNumPosts,
  mockResponseListPostsPayload,
  mockApiServerEndpointHandlers,
};
