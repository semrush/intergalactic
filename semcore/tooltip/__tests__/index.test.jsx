import Button from '@semcore/button';
import Link from '@semcore/link';
import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, userEvent, waitFor } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Tooltip, { Hint, DescriptionTooltip } from '../src';

const TooltipWrapper = ({ children }) => <Tooltip>{children}</Tooltip>;
describe('tooltip Dependency imports', () => {
  runDependencyCheckTests('tooltip');
});

describe('Tooltip', () => {
  beforeEach(cleanup);

  describe('Tooltip.Trigger', () => {
    shouldHaveDataUiName({
      Component: Tooltip.Trigger,
      Wrapper: TooltipWrapper,
      props: { children: 'Trigger' },
      expectedDataUiName: 'Tooltip.Trigger',
    });

    test('Verify supports custom tag', () => {
      const { getByTestId } = render(
        <Tooltip>
          <Tooltip.Trigger tag='button' type='button' data-testid='button-trigger'>
            Trigger
          </Tooltip.Trigger>
          <Tooltip.Trigger tag={Button} data-testid='semcore-button-trigger'>
            Trigger
          </Tooltip.Trigger>
          <Tooltip.Trigger tag={Link} href='#' data-testid='link-trigger'>
            Trigger
          </Tooltip.Trigger>
        </Tooltip>,
      );

      expect(getByTestId('button-trigger').tagName).toBe('BUTTON');
      expect(getByTestId('semcore-button-trigger').tagName).toBe('BUTTON');
      expect(getByTestId('link-trigger').tagName).toBe('A');
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

  test('Verify opens and hides on mouse events', async () => {
    const spy = vi.fn();
    const { getByText } = render(
      <Tooltip title='test' disablePortal timeout={0} onVisibleChange={spy}>
        Trigger
      </Tooltip>,
    );

    await userEvent.hover(getByText('Trigger'));
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(true, expect.anything());
    });

    await userEvent.unhover(getByText('Trigger'));
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(false, expect.anything());
      expect(spy).toHaveBeenCalledTimes(2);
    });
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
