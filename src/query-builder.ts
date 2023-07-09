/**
 * [equals]
 *
 * @example
 * equals('gender', 'women');
 * //=> gender[equals]women
 *
 * @param {string} key
 * @param {string} value
 */
export const equals = (key: string, value: string) => `${key}[equals]${value}`;
export const eq = equals;

/**
 * [not_equals]
 *
 * @example
 * notEquals('gender', 'women');
 * //=> gender[not_equals]women
 *
 * @param {string} key
 * @param {string} value
 */
export const notEquals = (key: string, value: string) => `${key}[not_equals]${value}`;
export const neq = notEquals;

/**
 * [less_than]
 *
 * @example
 * lessThan('createdAt', '2019-11');
 * //=> createdAt[less_than]2019-11
 *
 * @param {string} key
 * @param {string} value
 */
export const lessThan = (key: string, value: string) => `${key}[less_than]${value}`;
export const lt = lessThan;

/**
 * [greater_than]
 *
 * @example
 * greaterThan('createdAt', '2019-11');
 * //=> createdAt[greater_than]2019-11
 *
 * @param {string} key
 * @param {string} value
 */
export const greaterThan = (key: string, value: string) => `${key}[greater_than]${value}`;
export const gt = greaterThan;

/**
 * [contains]
 *
 * @example
 * contains('title', 'sale');
 * //=> title[contains]sale
 *
 * @param {string} key
 * @param {string} value
 */
export const contains = (key: string, value: string) => `${key}[contains]${value}`;

/**
 * [exists]
 *
 * @example
 * exists('nextLink');
 * //=> nextLink[exists]
 *
 * @param {string} key
 */
export const exists = (key: string) => `${key}[exists]`;

/**
 * [not_exists]
 *
 * @example
 * notExists('nextLink');
 * //=> nextLink[not_exists]
 *
 * @param {string} key
 */
export const notExists = (key: string) => `${key}[not_exists]`;

/**
 * [begins_with]
 *
 * @example
 * beginsWith('publishedAt', '2019-11');
 * //=> publishedAt[begins_with]2019-11
 *
 * @param {string} key
 * @param {string} value
 */
export const beginsWith = (key: string, value: string) => `${key}[begins_with]${value}`;

/**
 * [and]
 *
 * @example
 * and('filter1', 'filter2', ..., 'filter10')
 * //=> filter1[and]filter2[and]...[and]filter10
 *
 * @param  {...string} filters
 */
export const and = (...filters: Array<string>) => filters.join('[and]');

/**
 * [or]
 *
 * @example
 * or('filter1', 'filter2', ..., 'filter10')
 * //=> filter1[or]filter2[or]...[or]filter10
 *
 * @param  {...string} filters
 */
export const or = (...filters: Array<string>) => filters.join('[or]');
