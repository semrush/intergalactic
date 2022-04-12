import { testing, shared as testsShared } from '@semcore/jest-preset-ui';
const { cleanup } = testing;

const { shouldSupportClassName, shouldSupportRef } = testsShared;
import Sticky from '../src';

describe('Sticky', () => {
  afterEach(cleanup);

  shouldSupportClassName(Sticky);
  shouldSupportRef(Sticky);
});
