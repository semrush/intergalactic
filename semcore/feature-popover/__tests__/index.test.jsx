import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { render, cleanup } from '@semcore/testing-utils/testing-library';

import FeaturePopover from '../src';

import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('feature-popover Dependency imports', () => {
  runDependencyCheckTests('feature-popover');
});

describe('FeaturePopover.Trigger', () => {
  beforeEach(cleanup);

  test('should support custom className', () => {
    const { getByTestId } = render(
      <FeaturePopover>
        <FeaturePopover.Trigger data-testid='trigger' className='more-than one-class' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['class'].value).toContain('more-than one-class');
  });

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <FeaturePopover>
        <FeaturePopover.Trigger data-testid='trigger' name='trigger' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <FeaturePopover>
        <FeaturePopover.Trigger tag='button' ref={ref} />
      </FeaturePopover>,
    );
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('should support children', async () => {
    const component = (
      <FeaturePopover>
        <FeaturePopover.Trigger>
          <p data-testid='child'>Test</p>
        </FeaturePopover.Trigger>
      </FeaturePopover>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });
});

describe('FeaturePopover.Popper', () => {
  beforeEach(cleanup);

  test('should support custom className', () => {
    const { getByTestId } = render(
      <FeaturePopover visible>
        <FeaturePopover.Popper data-testid='trigger' className='more-than one-class' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['class'].value).toContain('more-than one-class');
  });

  test('should support custom attributes', () => {
    const { getByTestId } = render(
      <FeaturePopover visible>
        <FeaturePopover.Popper data-testid='trigger' name='trigger' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('should support ref', () => {
    const ref = React.createRef();
    render(
      <FeaturePopover visible>
        <FeaturePopover.Popper tag='div' ref={ref} />
      </FeaturePopover>,
    );
    expect(ref.current.nodeName).toBe('DIV');
  });

  test('should support children', async () => {
    const component = (
      <FeaturePopover visible>
        <FeaturePopover.Popper>
          <p data-testid='child'>Test</p>
        </FeaturePopover.Popper>
      </FeaturePopover>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeTruthy();
  });

  test.concurrent('visual regression of close icon', async ({ task }) => {
    const component = (
      <div
        style={{
          width: 400,
          height: 200,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <FeaturePopover onVisibleChange={() => {}} visible disablePortal>
          <FeaturePopover.Trigger>
            <div style={{ position: 'relative' }}>
              Open Popover
              <FeaturePopover.Spot />
            </div>
          </FeaturePopover.Trigger>
          <FeaturePopover.Popper closeIcon wMax={350}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, atque eveniet
            excepturi fugit illum perspiciatis praesentium sequi totam vel. Consequatur delectus
            dolorem eos itaque numquam officia reprehenderit temporibus ut!
          </FeaturePopover.Popper>
        </FeaturePopover>
      </div>
    );

    await expect(
      await snapshot(component, { actions: { hover: '[aria-label="Close"]' } }),
    ).toMatchImageSnapshot(task);
  });
});
