import React from 'react';

import { test, expect } from '../vitest';
import { renderWithContractTarget } from './contractTestUtils';

export type ComponentContractTagCase = {
  tag: string | React.ElementType;
  name?: string;
  expectedTagName?: string;
  props?: Record<string, unknown>;
};

const defaultTagCases: ComponentContractTagCase[] = [{ tag: 'span' }];

const getTagCaseName = ({ tag, name }: ComponentContractTagCase) => {
  if (name) return name;
  if (typeof tag === 'string') return `"${tag}"`;
  return (tag as any).displayName || (tag as any).name || 'custom component';
};

const getExpectedTagName = ({ tag, expectedTagName }: ComponentContractTagCase) => {
  if (expectedTagName) return expectedTagName.toUpperCase();
  if (typeof tag === 'string') return tag.toUpperCase();
  throw new Error(`expectedTagName is required for component tag case "${getTagCaseName({ tag })}"`);
};

export const shouldSupportTag = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
  tagCases: ComponentContractTagCase[] = defaultTagCases,
) => {
  for (const tagCase of tagCases) {
    const { tag, props: tagProps } = tagCase;

    test.sequential(`should support tag=${getTagCaseName(tagCase)}`, () => {
      const { target } = renderWithContractTarget(Component, Wrapper, {
        ...props,
        ...tagProps,
        tag,
      });

      expect(target.tagName).toBe(getExpectedTagName(tagCase));
    });
  }
};
