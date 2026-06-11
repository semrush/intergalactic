import { label, story, suite, layer, subSuite } from 'allure-js-commons';
import { getGlobalTestRuntime } from 'allure-js-commons/sdk/runtime';
// eslint-disable-next-line no-restricted-imports
import { test as baseTest } from 'vitest';

const hasAllureRuntime = () => {
  return getGlobalTestRuntime().constructor.name !== 'NoopTestRuntime';
};

const test = baseTest.extend<{
  testHook: void;
}>({
  testHook: [
    async function () {
      // eslint-disable-next-line prefer-rest-params
      const [task, use] = arguments;

      const filePathParts = (task.file?.name ?? '').split('/');

      const componentName = filePathParts[filePathParts.length - 3] ?? '';

      const subSuiteName = 'Unit tests';

      if (hasAllureRuntime()) {
        await label('framework', 'Vitest');
        await label('component', componentName);
        await subSuite(subSuiteName);
        await story(task.name);
        await suite(componentName);
        await layer(subSuiteName);
      }

      await use();
    },
    {
      auto: true,
    },
  ],
});

// eslint-disable-next-line import/export, no-restricted-imports
export * from 'vitest';
export {
  // eslint-disable-next-line import/export
  test,
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAttribute(name: string, value: string): R;
      toMatchImageSnapshot(task: any, options?: { maxPixelDiff?: number }): R;
      toHaveNoViolations(): R;
      toHaveFocus(): R;
      toHaveStyle(style: string): R;
      toBeInTheDocument(): R;
    }
  }
}
