import type { MicroCMSObjectContent } from 'microcms-js-sdk';
import type { MicroCMSListResponse } from 'microcms-js-sdk';
import { http, HttpResponse } from 'msw';

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
  http.get(`https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.notFound}`, () => {
    return HttpResponse.json({ message: 'not found' }, { status: 404 });
  }),
  http.get(`https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.postsEmpty}`, () => {
    return HttpResponse.json(
      {
        totalCount: 0,
        offset: 0,
        limit: 10,
        contents: [],
      },
      { status: 200 }
    );
  }),
  http.get(
    `https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.postsMany}`,
    ({ request }) => {
      const reqUrl = new URL(request.url);
      const offset = reqUrl.searchParams.get('offset');
      const limit = reqUrl.searchParams.get('limit');
      return HttpResponse.json(
        mockResponseListPostsPayload({ offset: offset ? Number(offset) : 0, limit: limit ? Number(limit) : 10 }),
        { status: 200 }
      );
    }
  ),
  http.get(`https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.list.postsInvalid}`, () => {
    return HttpResponse.json(
      {
        totalCount: 10,
        offset: 0,
        limit: 10,
        // 無効なレスポンスであることをテストしたいため、配列ではないものを設定
        contents: {},
      },
      { status: 200 }
    );
  }),

  /**
   * Endpoint handlers for object data
   */
  http.get(`https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.object.notFound}`, () => {
    return HttpResponse.json({ message: 'not found' }, { status: 404 });
  }),
  http.get(`https://${mockServiceId}.microcms.io/api/${__version}/${mockApiServerEndpoints.object.some}`, () => {
    return HttpResponse.json(mockResponseObjectSomePayload, { status: 200 });
  }),
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
