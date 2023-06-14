/* eslint-disable import/no-extraneous-dependencies, import/named */
export * from 'vitest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(task: any): R;
      toHaveNoViolations(): R;
    }
  }
}
