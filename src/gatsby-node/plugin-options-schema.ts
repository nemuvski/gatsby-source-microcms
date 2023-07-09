import type { GatsbyNode } from 'gatsby';
import { ApiFormat } from '../plugin-options';

const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({ Joi }) => {
  /**
   * @type {import('../plugin-options').MicroCMSPluginOptions}
   */
  return Joi.object({
    apiKey: Joi.string().required().empty(),
    serviceId: Joi.string().required().empty(),
    apis: Joi.array()
      .min(1)
      .items(
        Joi.object({
          endpoint: Joi.string().required().empty(),
          type: Joi.string(),
          format: Joi.string().valid(...Object.values(ApiFormat)),
          // microcms-js-sdkのqueryに渡すオブジェクト
          query: Joi.object(),
        })
      )
      .required(),
  });
};

export { pluginOptionsSchema };
