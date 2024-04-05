type PartiallyRequired<T extends Record<string, unknown>, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type { PartiallyRequired };
