import { createClient } from 'microcms-js-sdk';
import { ApiFormat } from './plugin-options';
import type { FilledDefaultMicroCMSPluginOptions, FilledDefaultMicroCMSPluginOptionsApi } from './plugin-options';
import type { MicroCMSListFetch, MicroCMSObjectFetch } from './models';

type __Props = {
  api: FilledDefaultMicroCMSPluginOptionsApi;
} & Pick<FilledDefaultMicroCMSPluginOptions, 'serviceId' | 'apiKey'>;

const fetchListData = async (props: __Props): Promise<MicroCMSListFetch> => {
  if (props.api.format !== ApiFormat.List) {
    throw new Error(`Invalid api format: ${props.api.format}`);
  }

  const client = createClient({
    serviceDomain: props.serviceId,
    apiKey: props.apiKey,
    retry: true,
  });

  return client.getList({
    endpoint: props.api.endpoint,
    queries: props.api.query,
  });
};

const fetchObjectData = async (props: __Props): Promise<MicroCMSObjectFetch> => {
  if (props.api.format !== ApiFormat.Object) {
    throw new Error(`Invalid api format: ${props.api.format}`);
  }

  const client = createClient({
    serviceDomain: props.serviceId,
    apiKey: props.apiKey,
    retry: true,
  });

  return client.getObject({
    endpoint: props.api.endpoint,
    queries: props.api.query,
  });
};

export { fetchListData, fetchObjectData };
