import { beforeEach } from 'vitest';
import { label, feature, story, parentSuite, suite, subSuite, layer } from 'allure-js-commons';

beforeEach(async (context) => {
  const filePath = (context.task.file?.name ?? '').split('/'); 
  const fileName = filePath[filePath.length - 1]; 
  const component = filePath[filePath.length - 3] ?? ''; 
  const subSuiteName = fileName.split(' > ')[1] ?? ''; 

  const suit = 'Unit tests';
  const storyName = context.task.name;

  await label('framework', 'Vitest');
  await label('component', component);
  await feature(suit);
  await layer(suit);
  await story(storyName);
  await parentSuite(component);
  await suite(suit);
  await subSuite(subSuiteName);
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
