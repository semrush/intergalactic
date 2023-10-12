export * from 'vitest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAttribute(name: string, value: string): R;
      toMatchImageSnapshot(task: any, options?: { maxPixelDiff?: number }): R;
      toHaveNoViolations(): R;
      toHaveFocus(): R;
      toHaveStyle(style: string): R;
    }
  }
}
