import React from 'react';
import { cleanup, fireEvent, render, act } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { axe } from '@semcore/testing-utils/axe';

import Tooltip, { Hint, DescriptionTooltip } from '../src';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { waitFor } from '@storybook/test';

describe('tooltip Dependency imports', () => {
  runDependencyCheckTests('tooltip');
});

describe('Tooltip.Trigger', () => {
  beforeEach(cleanup);

  test('should support custom className', () => {
    const { getByTestId } = render(
      <Tooltip>
        <Tooltip.Trigger data-testid='trigger' className='more-than one-class' />
      </Tooltip>,
    );

    expect(getByTestId('trigger').attributes['class'].value).toContain('more-than one-class');
  });

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <Tooltip>
        <Tooltip.Trigger data-testid='trigger' name='trigger' />
      </Tooltip>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <Tooltip>
        <Tooltip.Trigger tag='button' ref={ref} />
      </Tooltip>,
    );
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('should support children', async () => {
    const component = (
      <Tooltip>
        <Tooltip.Trigger>
          <p data-testid='child'>Test</p>
        </Tooltip.Trigger>
      </Tooltip>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});

describe('Tooltip.Popper', () => {
  beforeEach(cleanup);

  test('should support custom className', async ({ expect }) => {
    const { getByTestId } = render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper data-testid='popper' className='more-than one-class' />
      </Tooltip>,
    );

    await waitFor(
      () => {
        expect(getByTestId('popper').attributes['class'].value).toContain('more-than one-class');
      },
      { timeout: 500 },
    );
  });

  test('should support custom attributes', async ({ expect }) => {
    const { getByTestId } = render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper data-testid='popper' name='popper' />
      </Tooltip>,
    );

    await waitFor(
      () => {
        expect(getByTestId('popper').attributes['name'].value).toBe('popper');
      },
      { timeout: 500 },
    );
  });

  test('should support ref', async ({ expect }) => {
    const ref = React.createRef();
    render(
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper ref={ref} />
      </Tooltip>,
    );

    await waitFor(
      () => {
        expect(ref.current.nodeName).toBe('DIV');
      },
      { timeout: 250 },
    );
  });

  test('should support children', async ({ expect }) => {
    const component = (
      <Tooltip visible>
        <Tooltip.Trigger />
        <Tooltip.Popper>
          <p>test popper content</p>
        </Tooltip.Popper>
      </Tooltip>
    );

    const { getAllByText } = render(component);

    await waitFor(
      () => {
        expect(getAllByText('test popper content', {})).toHaveLength(1);
      },
      { timeout: 250 },
    );
  });

  test('should support render function for children', async ({ expect }) => {
    const component = (
      <Tooltip visible>
        {() => (
          <>
            <Tooltip.Trigger />
            <Tooltip.Popper />
          </>
        )}
      </Tooltip>
    );
    render(component);

    await waitFor(
      () => {
        expect(
          document.querySelectorAll('[data-ui-name^="Tooltip"][data-ui-name$="Popper"]').length,
        ).toBe(1);
      },
      { timeout: 250 },
    );
  });
});

describe('TooltipBase', () => {
  beforeEach(cleanup);

  test('should support ref', () => {
    const ref = React.createRef();
    render(<Tooltip ref={ref} tag='button' title='test' />);
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('open/hide', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { getByTestId } = render(
      <Tooltip title='Test test test' disablePortal onVisibleChange={spy}>
        <button type='button' data-testid='trigger'>
          trigger
        </button>
      </Tooltip>,
    );

    fireEvent.mouseMove(getByTestId('trigger'));
    fireEvent.mouseEnter(getByTestId('trigger'));
    act(() => {
      vi.runAllTimers();
    });
    expect(spy).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(getByTestId('trigger'));
    act(() => {
      vi.runAllTimers();
    });
    expect(spy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  describe('a11y', () => {
    test('Hint', async () => {
      const { container } = render(
        <Hint title='text' visible tag='a'>
          trigger
        </Hint>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    test('Tooltip', async () => {
      const { container } = render(
        <Tooltip visible disablePortal>
          <Tooltip.Trigger tag='button'>trigger</Tooltip.Trigger>
          <Tooltip.Popper>text</Tooltip.Popper>
        </Tooltip>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    test('DescriptionTooltip', async () => {
      const { container } = render(
        <DescriptionTooltip visible disablePortal>
          <DescriptionTooltip.Trigger tag='button'>trigger</DescriptionTooltip.Trigger>
          <DescriptionTooltip.Popper aria-label={'required aria label'}>
            text
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
