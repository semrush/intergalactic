import type { Locator } from '../playwright';

type Options = {
  checkInterval: number;
  maxAttempts: number;
  waitForState: NonNullable<Parameters<Locator['waitFor']>['0']>['state'];
};

export async function waitForAnimations(
  locator: Locator,
  { checkInterval, maxAttempts, waitForState }: Options = {
    checkInterval: 10,
    maxAttempts: 50,
    waitForState: 'visible',
  },
) {
  await locator.waitFor({ state: waitForState });

  let previousBox = await locator.boundingBox();
  if (!previousBox) throw new Error('Element not found or not visible');

  for (let i = 0; i < maxAttempts; i++) {
    await locator.page().waitForTimeout(checkInterval);

    const currentBox = await locator.boundingBox();
    if (!currentBox) continue;

    const moved =
      Math.abs(previousBox.x - currentBox.x) > 1 ||
      Math.abs(previousBox.y - currentBox.y) > 1 ||
      Math.abs(previousBox.width - currentBox.width) > 1 ||
      Math.abs(previousBox.height - currentBox.height) > 1;

    if (!moved) {
      return;
    }

    previousBox = currentBox;
  }

  throw new Error('Element didn\'t stabilize in time.');
}
