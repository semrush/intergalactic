import { StoryObj } from '@storybook/react';

export const INTERACTION_STORAGE_KEY = 'enableInteractions';

export function isAutoPlay() {
  let interaction = window?.localStorage.getItem(INTERACTION_STORAGE_KEY);

  if (interaction === null) {
    window?.localStorage.setItem(INTERACTION_STORAGE_KEY, 'true');
    interaction = 'true';
  }

  return interaction === 'true';
}

export function toggleAutoPlay() {
  const enable = isAutoPlay();
  window?.localStorage.setItem(INTERACTION_STORAGE_KEY, `${!enable}`);
}

export function playWrapper(fn: StoryObj['play']): StoryObj['play'] | undefined {
  return isAutoPlay() ? fn : undefined;
}
