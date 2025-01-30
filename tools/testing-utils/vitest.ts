import { beforeEach } from 'vitest';
import { label, feature, story, parentSuite, suite, subSuite } from 'allure-js-commons';

beforeEach(async (context) => {
  const suit = 'Unit tests';
  const filePath = (context.task.file?.name ?? '').split('/');
  const fileName = filePath[filePath.length - 1];
  const component = filePath[1] ?? '';
  const componentName = component.charAt(0).toUpperCase() + component.slice(1);

  const storyName = context.task.name;

  await label('component', componentName);
  await feature(suit);
  await story(storyName);

  await parentSuite(componentName);
  await suite(suit);
  await subSuite(storyName);
});

export * from 'vitest';

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
