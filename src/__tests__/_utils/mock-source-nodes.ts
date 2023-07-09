import type { GatsbyCache, Node, NodePluginArgs, ParentSpanPluginArgs, SourceNodesArgs } from 'gatsby';
import { Span } from 'opentracing';
import crypto from 'crypto';
import { EventEmitter } from 'events';
import { mockFunction, mockFunctionThrowError } from './mock-function';
import { mockGatsbyCache } from './mock-gatsby-cache';

const __nodePluginArgs = (nodeStore: Map<string, Node>, gatsbyCache: GatsbyCache): NodePluginArgs => {
  const args: NodePluginArgs = {
    pathPrefix: '',
    basePath: '',
    actions: {
      deletePage: mockFunctionThrowError,
      createPage: mockFunctionThrowError,
      createSlice: mockFunctionThrowError,
      deleteNode: mockFunctionThrowError,
      createNode(node) {
        nodeStore.set(node.id, {
          ...node,
          parent: null,
          children: [],
          internal: {
            ...node.internal,
            owner: '__MOCK_OWNER__',
          },
        });
      },
      touchNode: mockFunctionThrowError,
      createNodeField: mockFunctionThrowError,
      createParentChildLink: mockFunctionThrowError,
      unstable_createNodeManifest: mockFunctionThrowError,
      setRequestHeaders: mockFunctionThrowError,
      setWebpackConfig: mockFunctionThrowError,
      replaceWebpackConfig: mockFunctionThrowError,
      setBabelOptions: mockFunctionThrowError,
      setBabelPlugin: mockFunctionThrowError,
      setBabelPreset: mockFunctionThrowError,
      createJob: mockFunctionThrowError,
      createJobV2: mockFunctionThrowError,
      addGatsbyImageSourceUrl: mockFunctionThrowError,
      setJob: mockFunctionThrowError,
      endJob: mockFunctionThrowError,
      setPluginStatus: mockFunctionThrowError,
      createRedirect: mockFunctionThrowError,
      addThirdPartySchema: mockFunctionThrowError,
      createTypes: mockFunctionThrowError,
      createFieldExtension: mockFunctionThrowError,
      printTypeDefinitions: mockFunctionThrowError,
      enableStatefulSourceNodes: mockFunctionThrowError,
    },
    loadNodeContent: mockFunctionThrowError,
    store: {
      dispatch: mockFunctionThrowError,
      subscribe: mockFunctionThrowError,
      getState: mockFunctionThrowError,
      replaceReducer: mockFunctionThrowError,
    },
    emitter: new EventEmitter(),
    getNode(id) {
      return nodeStore.get(id);
    },
    getNodes() {
      return [...nodeStore.values()];
    },
    getNodesByType(type) {
      return [...nodeStore.values()].filter((node) => node.internal.type === type);
    },
    reporter: {
      stripIndent: mockFunctionThrowError,
      format: {} as ParentSpanPluginArgs['reporter']['format'],
      errorMap: {},
      setErrorMap: mockFunctionThrowError,
      setVerbose: mockFunctionThrowError,
      setNoColor: mockFunctionThrowError,
      panic: mockFunctionThrowError,
      panicOnBuild: mockFunctionThrowError,
      error: mockFunctionThrowError,
      uptime: mockFunctionThrowError,
      verbose: mockFunctionThrowError,
      success: mockFunction,
      info: mockFunction,
      warn: mockFunction,
      log: mockFunction,
      pendingActivity: mockFunctionThrowError,
      completeActivity: mockFunctionThrowError,
      activityTimer: mockFunctionThrowError,
      phantomActivity: mockFunctionThrowError,
      createProgress: mockFunctionThrowError,
      _setStage: mockFunctionThrowError,
      _initReporterMessagingInWorker: mockFunctionThrowError,
      _initReporterMessagingInMain: mockFunctionThrowError,
      _renderPageTree: mockFunctionThrowError,
      _registerAdditionalDiagnosticOutputHandler: mockFunctionThrowError,
    },
    getNodeAndSavePathDependency: mockFunctionThrowError,
    cache: gatsbyCache,
    getCache: mockFunctionThrowError,
    createNodeId(input) {
      return crypto.createHash('md5').update(input).digest('hex');
    },
    createContentDigest(input: string | object) {
      return crypto
        .createHash('md5')
        .update(typeof input === 'string' ? input : JSON.stringify(input))
        .digest('hex');
    },
    tracing: {
      tracer: {},
      parentSpan: {},
      startSpan: mockFunctionThrowError,
    },
    schema: {
      buildEnumType(config) {
        return { kind: 'ENUM', config };
      },
      buildInputObjectType(config) {
        return { kind: 'INPUT_OBJECT', config };
      },
      buildInterfaceType(config) {
        return { kind: 'INTERFACE', config };
      },
      buildObjectType(config) {
        return { kind: 'OBJECT', config };
      },
      buildScalarType(config) {
        return { kind: 'SCALAR', config };
      },
      buildUnionType(config) {
        return { kind: 'UNION', config };
      },
    },
  };
  return args;
};

class __MockSpan extends Span {}
const __parentSpan: ParentSpanPluginArgs['parentSpan'] = new __MockSpan();

const createMockSourceNodesArgs = (): SourceNodesArgs => {
  const gatsbyCache = mockGatsbyCache();
  const nodeStore = new Map<string, Node>();

  return {
    ...__nodePluginArgs(nodeStore, gatsbyCache),
    parentSpan: __parentSpan,
    traceId: 'initial-sourceNodes',
    waitForCascadingActions: false,
    webhookBody: {},
  };
};

export { createMockSourceNodesArgs };
