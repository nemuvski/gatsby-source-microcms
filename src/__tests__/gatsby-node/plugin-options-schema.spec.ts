import { testPluginOptionsSchema } from 'gatsby-plugin-utils';
import { describe, test, expect } from 'vitest';
import { pluginOptionsSchema } from '../../gatsby-node/plugin-options-schema';
import type { MicroCMSPluginOptions } from '../../plugin-options';

const __testPluginOptionsSchema = (options: Partial<MicroCMSPluginOptions>) => {
  return testPluginOptionsSchema(
    // @ts-ignore: testPluginOptionsSchemaの引数部分の型警告回避
    pluginOptionsSchema,
    options
  );
};

describe('gatsby-node/plugin-options-schema.ts', () => {
  describe('pluginOptionsSchema()', () => {
    const serviceId = 'test';
    const apiKey = '__this-is-api-key__';

    describe('passes on valid plugin-options', () => {
      test('serviceId,apiKey,apis', async () => {
        const res = await __testPluginOptionsSchema({ serviceId, apiKey, apis: [{ endpoint: 'test' }] });
        expect(res.errors).toEqual([]);
        expect(res.isValid).toBe(true);
      });
      test('serviceId,apiKey,apis,version', async () => {
        const res = await __testPluginOptionsSchema({
          serviceId,
          apiKey,
          apis: [{ endpoint: 'test', format: 'list', query: { limit: 1, offset: 0, depth: 3 } }],
        });
        expect(res.errors).toEqual([]);
        expect(res.isValid).toBe(true);
      });
    });

    describe('fails on missing plugin-options', () => {
      test('missing apiKey,serviceId,apis', async () => {
        const res = await __testPluginOptionsSchema({});
        expect(res.errors).toEqual(['"apiKey" is required', '"serviceId" is required', '"apis" is required']);
        expect(res.isValid).toEqual(false);
      });

      test('missing apis[endpoint]', async () => {
        const res = await __testPluginOptionsSchema({
          serviceId,
          apiKey,
          // @ts-ignore: テストのため警告無視
          apis: [{ endpoint: undefined }],
        });
        expect(res.errors).toEqual(['"apis[0].endpoint" is required']);
        expect(res.isValid).toBe(false);
      });
    });

    describe('fails on invalid plugin-options', () => {
      test('apiKey,serviceId,apis.endpoint is not allowed to be empty', async () => {
        const res = await __testPluginOptionsSchema({
          serviceId: '',
          apiKey: '',
          apis: [{ endpoint: '' }],
        });
        expect(res.errors).toEqual([
          '"apiKey" is not allowed to be empty',
          '"serviceId" is not allowed to be empty',
          '"apis[0].endpoint" is not allowed to be empty',
        ]);
        expect(res.isValid).toBe(false);
      });

      test('apis must contain at least 1 item', async () => {
        const res = await __testPluginOptionsSchema({
          serviceId,
          apiKey,
          apis: [],
        });
        expect(res.errors).toEqual(['"apis" must contain at least 1 items']);
        expect(res.isValid).toBe(false);
      });

      test('apis[PROPS] took invalid value', async () => {
        const res = await __testPluginOptionsSchema({
          serviceId,
          apiKey,
          apis: [
            {
              endpoint: '',
              // @ts-ignore: テストのため警告無視
              format: '__test__',
              // @ts-ignore: テストのため警告無視
              query: 'aaaa',
            },
          ],
        });
        expect(res.errors).toEqual([
          '"apis[0].endpoint" is not allowed to be empty',
          '"apis[0].format" must be one of [list, object]',
          '"apis[0].query" must be of type object',
        ]);
        expect(res.isValid).toBe(false);
      });
    });
  });
});
