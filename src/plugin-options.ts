import type { PartiallyRequired } from './util-types';
import type { MicroCMSQueries } from 'microcms-js-sdk';

const ApiFormat = {
  List: 'list',
  Object: 'object',
} as const;
type ApiFormat = (typeof ApiFormat)[keyof typeof ApiFormat];

type MicroCMSPluginOptionsApi = {
  /**
   * API endpoint name. (Required)
   *
   * @example
   * endpoint: 'posts'
   * //=> https://xxx.microcms.io/api/v1/posts
   */
  endpoint: string;
  /**
   * Graphql type. (Optional)
   * This is used in GraphQL queries.
   *
   * @default `endpoint` value
   * @example
   * type: 'post'
   * //=> The GraphQL types are named 'microcmsPost' and 'allMicrocmsPost'
   */
  type?: string;
  /**
   * microCMS's content type('list' or 'object'). (Optional)
   * if format is 'list', read all contents by fetching multiple times.
   *
   * @default 'list'
   */
  format?: ApiFormat;
  /**
   * API request query options. (Optional)
   */
  query?: MicroCMSQueries;
};
type FilledDefaultMicroCMSPluginOptionsApi = PartiallyRequired<MicroCMSPluginOptionsApi, 'type' | 'format' | 'query'>;

/**
 * microCMS plugin options.
 */
interface MicroCMSPluginOptions {
  /**
   * The authentication key required for API requests. (Required)
   */
  apiKey: string;
  /**
   * Service information. (Required)
   *
   * @example
   * serviceId: 'xxx'
   * //=> xxx.microcms.io
   */
  serviceId: string;
  /**
   * API information. (Required)
   * Multiple APIs can be specified.
   */
  apis: Array<MicroCMSPluginOptionsApi>;
}
interface FilledDefaultMicroCMSPluginOptions extends Required<Omit<MicroCMSPluginOptions, 'apis'>> {
  apis: Array<FilledDefaultMicroCMSPluginOptionsApi>;
}

/**
 * オプション中のデフォルト値を埋める
 *
 * @param options
 * @see {import('./gatsby-node/plugin-options-schema').pluginOptionsSchema} 事前にチェックされた値が渡されるため、値や型のチェックは省略
 */
const fillDefaultPluginOptions = <P extends MicroCMSPluginOptions>(options: P): FilledDefaultMicroCMSPluginOptions => {
  const filledOptions = { ...options };

  filledOptions.apis.map((api) => {
    // typeが未指定の場合は、endpointの値を使う
    api.type = api.type || api.endpoint;
    // formatについてのデフォルト値
    api.format = api.format || ApiFormat.List;
    // queryについてのデフォルト値
    api.query = api.query || {};
  });

  return filledOptions as FilledDefaultMicroCMSPluginOptions;
};

export {
  type MicroCMSPluginOptions,
  type MicroCMSPluginOptionsApi,
  type FilledDefaultMicroCMSPluginOptions,
  type FilledDefaultMicroCMSPluginOptionsApi,
  ApiFormat,
  fillDefaultPluginOptions,
};
