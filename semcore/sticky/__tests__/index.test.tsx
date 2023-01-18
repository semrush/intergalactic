import { testing, shared as testsShared } from '@semcore/jest-preset-ui';
import { assert, expect, test, describe, beforeEach, vi } from 'vitest';
const { cleanup } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Sticky from '../src';

describe('Sticky', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Sticky);
  shouldSupportRef(Sticky);
});
