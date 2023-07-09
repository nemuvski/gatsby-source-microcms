import type { Node, SourceNodesArgs } from 'gatsby';
import type { MicroCMSListData, MicroCMSObjectData } from './models';
import camelcase from 'camelcase';

const __TYPE_PREFIX = 'Microcms';

type __Props = {
  sourceNodesArgs: SourceNodesArgs;
  sortIndex?: number;
  content: MicroCMSObjectData | MicroCMSListData;
  serviceId: string;
  endpoint: string;
  type: string;
};

const createContentNode = ({ sourceNodesArgs, sortIndex, content, serviceId, endpoint, type }: __Props) => {
  const nodeContent = JSON.stringify(content);
  const nodeId = sourceNodesArgs.createNodeId(`${serviceId}___${content.id || nodeContent}___${endpoint}`);
  const nodeContentDigest = sourceNodesArgs.createContentDigest(content);

  const nodeInternal: Node['internal'] = {
    // @ts-ignore: ownerはGatsbyで付与されるものなので、ここでは未指定とする
    // 指定すると次のように警告が出る => The node internal.owner field is set automatically by Gatsby and not by plugins.
    owner: undefined,

    type: camelcase([__TYPE_PREFIX, type], { pascalCase: true }),
    content: nodeContent,
    contentDigest: nodeContentDigest,
  };

  const node: Node = {
    ...content,
    sortIndex,

    id: nodeId,
    parent: null,
    children: [],
    // @ts-ignore: ownerプロパティを指定すると
    internal: nodeInternal,
  };

  if (typeof content.id === 'string') {
    const contentIdName = camelcase([type, 'id']);
    node[contentIdName] = content.id;
  }

  sourceNodesArgs.actions.createNode(node);
};

export { createContentNode };
