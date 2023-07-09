import type { GatsbyNode, PluginOptions, SourceNodesArgs } from 'gatsby';
import type {
  FilledDefaultMicroCMSPluginOptions,
  FilledDefaultMicroCMSPluginOptionsApi,
  MicroCMSPluginOptions,
} from '../plugin-options';
import { ApiFormat, fillDefaultPluginOptions } from '../plugin-options';
import { fetchListData, fetchObjectData } from '../fetch-data';
import { createContentNode } from '../create-content-node';

const __createContentNodesForListFormat = async (
  sourceNodesArgs: SourceNodesArgs,
  { serviceId, apiKey }: FilledDefaultMicroCMSPluginOptions,
  targetApi: FilledDefaultMicroCMSPluginOptionsApi
) => {
  let offset = 0;
  const limit = targetApi.query.limit || 10;
  let totalCount = 0;

  do {
    const data = await fetchListData({
      serviceId,
      apiKey,
      api: { ...targetApi, query: { ...targetApi.query, offset } },
    });

    if (data.totalCount) {
      totalCount = data.totalCount;
    } else {
      break;
    }

    if (!Array.isArray(data.contents)) {
      sourceNodesArgs.reporter.panic(`Invalid contents format: ${data.contents}`);
      break;
    }

    data.contents.forEach((dataContent, idx) => {
      createContentNode({
        sourceNodesArgs,
        sortIndex: offset + idx,
        content: dataContent,
        serviceId,
        endpoint: targetApi.endpoint,
        type: targetApi.type,
      });
    });

    offset += limit;
  } while (offset < totalCount);
};

const __createContentNodesForObjectFormat = async (
  sourceNodesArgs: SourceNodesArgs,
  { serviceId, apiKey }: FilledDefaultMicroCMSPluginOptions,
  targetApi: FilledDefaultMicroCMSPluginOptionsApi
) => {
  const data = await fetchObjectData({ serviceId, apiKey, api: targetApi });

  createContentNode({
    sourceNodesArgs,
    content: data,
    serviceId,
    endpoint: targetApi.endpoint,
    type: targetApi.type,
  });
};

const sourceNodes: GatsbyNode['sourceNodes'] = async (
  sourceNodesArgs,
  pluginOptions: PluginOptions & MicroCMSPluginOptions
) => {
  const filledPluginOptions = fillDefaultPluginOptions(pluginOptions);

  for (const api of filledPluginOptions.apis) {
    switch (api.format) {
      case ApiFormat.List:
        await __createContentNodesForListFormat(sourceNodesArgs, filledPluginOptions, api);
        break;

      case ApiFormat.Object:
        await __createContentNodesForObjectFormat(sourceNodesArgs, filledPluginOptions, api);
        break;

      default:
        sourceNodesArgs.reporter.panic(`Invalid api format: ${api.format}`);
    }
  }
};

export { sourceNodes };
