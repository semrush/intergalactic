import Button from '@semcore/button';
import Link from '@semcore/link';
import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';
import { waitFor } from 'storybook/test';

import Tooltip, { Hint, DescriptionTooltip } from '../src';

const TooltipWrapper = ({ children }) => <Tooltip>{children}</Tooltip>;
describe('tooltip Dependency imports', () => {
  runDependencyCheckTests('tooltip');
});

describe('Tooltip', () => {
  beforeEach(cleanup);

  describe('Tooltip.Trigger', () => {
    runComponentContractTests({
      Component: Tooltip.Trigger,
      Wrapper: TooltipWrapper,
      props: { children: 'Trigger' },
      expectedDataUiName: 'Tooltip.Trigger',
      preset: 'root',
      include: ['tag'],
      tagCases: [
        { tag: 'button', expectedTagName: 'BUTTON', props: { type: 'button' } },
        { tag: Button, name: 'Button', expectedTagName: 'BUTTON' },
        { tag: Link, name: 'Link', expectedTagName: 'A', props: { href: '#' } },
      ],
    });
  });

  test('Verify supports className and custom attributes on Popper', async () => {
    const { getByTestId } = render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper data-testid='popper' className='custom' data-x='1' />
      </Tooltip>,
    );
    await waitFor(() => {
      expect(getByTestId('popper').className).toContain('custom');
      expect(getByTestId('popper').getAttribute('data-x')).toBe('1');
    });
  });

  test('Verify supports ref on Popper', async () => {
    const ref = React.createRef();
    render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper ref={ref} />
      </Tooltip>,
    );
    await waitFor(() => {
      expect(ref.current.nodeName).toBe('DIV');
    });
  });

  test('Verify supports render function as children', async () => {
    render(
      <Tooltip visible>
        {() => (
          <>
            <Tooltip.Trigger />
            <Tooltip.Popper data-testid='popper' />
          </>
        )}
      </Tooltip>,
    );
    await waitFor(() => {
      expect(document.querySelector('[data-testid="popper"]')).toBeTruthy();
    });
  });

  test('Verify opens and hides on mouse events', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { getByTestId } = render(
      <Tooltip title='test' disablePortal onVisibleChange={spy}>
        <button type='button' data-testid='trigger'>
          Trigger
        </button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(getByTestId('trigger'));
    act(() => vi.runAllTimers());
    fireEvent.mouseLeave(getByTestId('trigger'));
    act(() => vi.runAllTimers());
    expect(spy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});

// smoke for Hint и DescriptionTooltip

describe('Hint', () => {
  test('Verify supports ref', () => {
    const ref = React.createRef();
    render(<Hint ref={ref} tag='button' title='hint' />);
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('Verify displays popper with visible prop', async () => {
    const { getByTestId } = render(
      <Hint visible>
        <Hint.Trigger />
        <Hint.Popper data-testid='popper' />
      </Hint>,
    );
    await waitFor(() => {
      expect(getByTestId('popper')).toBeTruthy();
    });
  });
});

describe('DescriptionTooltip', () => {
  test('Verify supports ref', () => {
    const ref = React.createRef();
    render(<DescriptionTooltip ref={ref} tag='button' title='desc' />);
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('Verify displays popper with visible prop', async () => {
    const { getByTestId } = render(
      <DescriptionTooltip visible>
        <DescriptionTooltip.Trigger />
        <DescriptionTooltip.Popper data-testid='popper' />
      </DescriptionTooltip>,
    );
    await waitFor(() => {
      expect(getByTestId('popper')).toBeTruthy();
    });
  });
});
