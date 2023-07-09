import { describe, test, expectTypeOf } from 'vitest';
import type { PartiallyRequired } from '../util-types';

describe('util-types.ts', () => {
  test('PartiallyRequired', () => {
    expectTypeOf<
      PartiallyRequired<
        {
          x: string;
          y?: string;
          z?: number;
        },
        'x' | 'y'
      >
    >().toMatchTypeOf<{ x: string; y: string; z?: number }>();
  });
});
