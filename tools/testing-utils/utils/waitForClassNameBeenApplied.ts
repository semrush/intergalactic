import type { Locator } from '../playwright';

type Options = {
  checkInterval: number;
  maxAttempts: number;
};

export async function waitForClassNameBeenApplied(
  locator: Locator,
  className: string,
  { maxAttempts, checkInterval }: Options = {
    checkInterval: 10,
    maxAttempts: 10,
  },
) {
  for (let i = 0; i < maxAttempts; i++) {
    await locator.page().waitForTimeout(checkInterval);

    const isClassApplied = await locator.evaluate((element, className) => {
      return (element.className as string).includes(className);
    }, className);

    if (!isClassApplied) {
      continue;
    }

    return;
  }

  throw new Error('Element didn\'t received desired class name');
}
