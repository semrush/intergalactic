import { label, feature, story, suite, layer } from 'allure-js-commons';
import { test as baseTest } from 'vitest';

const test = baseTest.extend<{
  testHook: void;
}>({
  testHook: [
    async function () {
      // eslint-disable-next-line prefer-rest-params
      const [task, use] = arguments;

      const filePath = (task.file?.name ?? '').split('/');
      const component = filePath[filePath.length - 3] ?? '';

      const suit = 'Unit tests';
      const storyName = task.name;

      await label('framework', 'Vitest');
      await label('component', component);
      await feature(suit);
      await layer(suit);
      await story(storyName);
      await suite(suit);

      await use();
    },
    {
      auto: true,
    },
  ],
});

// eslint-disable-next-line import/export
export * from 'vitest';
export {
  // eslint-disable-next-line import/export
  test,
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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
