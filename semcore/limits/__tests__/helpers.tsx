import { expect, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

/** formatjs reports a missing translation through console.error, which overflows the jsdom console; translations have their own test. */
export const ignoreMissingTranslations = () => {
  const consoleError = console.error;
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    if (String(args[0]).includes('MISSING_TRANSLATION')) return;
    consoleError(...args);
  });
};

export const getMeter = (container: HTMLElement) => {
  const meter = container.querySelector<HTMLElement>('[role="meter"]');
  expect(meter).not.toBeNull();

  return meter!;
};

export const getRoot = (container: HTMLElement) => getMeter(container).parentElement!;
export const getFill = (container: HTMLElement) => getMeter(container).firstElementChild as HTMLElement;
export const getCounter = (container: HTMLElement) => getRoot(container).firstElementChild!.lastElementChild!;

export const getFilledValue = (container: HTMLElement) => {
  const match = getFill(container).getAttribute('style')?.match(/--filled-value[\w-]*:\s*([^;]+)/);
  expect(match).not.toBeNull();

  return Number(match![1]);
};

export const noticeProps = {
  title: 'Title',
  text: 'Description',
  primaryCta: <button type='button'>Start free 7-day trial</button>,
};

export const getRegion = (container: HTMLElement) => container.firstElementChild as HTMLElement;
