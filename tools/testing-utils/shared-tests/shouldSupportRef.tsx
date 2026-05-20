import React from 'react';

import { cleanup, render } from '../testing-library';
import { test, expect } from '../vitest';
import { getContractTestMarker } from './contractTestUtils';

export type ComponentContractRefTarget = 'contractTarget' | 'domNode';

export const shouldSupportRef = (
  Component: any,
  Wrapper: any = React.Fragment,
  props: any = {},
  refTarget: ComponentContractRefTarget = 'contractTarget',
) => {
  const testName =
    refTarget === 'contractTarget'
      ? 'ref should return contract target DOM-node'
      : 'ref should return DOM-node';

  test.sequential(testName, () => {
    cleanup();

    const ref = React.createRef<HTMLElement>();
    const marker = getContractTestMarker('ref');

    const result = render(
      <Wrapper>
        <Component {...props} data-contract-target={marker} ref={ref} />
      </Wrapper>,
    );

    if (refTarget === 'domNode') {
      expect(ref.current?.nodeName).toBeDefined();
      return;
    }

    const target = result.baseElement.querySelector(`[data-contract-target="${marker}"]`);

    if (!target) {
      throw new Error(`Unable to find contract test target by data-contract-target="${marker}"`);
    }

    expect(ref.current).toBe(target);
  });
};
