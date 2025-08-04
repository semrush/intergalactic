import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React from 'react';

import FeaturePopover from '../src';

describe('feature-popover Dependency imports', () => {
  runDependencyCheckTests('feature-popover');
});

describe('FeaturePopover.Trigger', () => {
  beforeEach(cleanup);

  test('Verify supports custom className', () => {
    const { getByTestId } = render(
      <FeaturePopover>
        <FeaturePopover.Trigger data-testid='trigger' className='more-than one-class' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['class'].value).toContain('more-than one-class');
  });

  test('Verify supports custom attributes', () => {
    const { getByTestId } = render(
      <FeaturePopover>
        <FeaturePopover.Trigger data-testid='trigger' name='trigger' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('Verify supports ref', () => {
    const ref = React.createRef();
    render(
      <FeaturePopover>
        <FeaturePopover.Trigger tag='button' ref={ref} />
      </FeaturePopover>,
    );
    expect(ref.current.nodeName).toBe('BUTTON');
  });

  test('Verify supports children', async () => {
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

  test('Verify supports custom className', () => {
    const { getByTestId } = render(
      <FeaturePopover visible>
        <FeaturePopover.Popper data-testid='trigger' className='more-than one-class' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['class'].value).toContain('more-than one-class');
  });

  test('Verify supports custom attributes', () => {
    const { getByTestId } = render(
      <FeaturePopover visible>
        <FeaturePopover.Popper data-testid='trigger' name='trigger' />
      </FeaturePopover>,
    );

    expect(getByTestId('trigger').attributes['name'].value).toBe('trigger');
  });

  test('Verify supports ref', () => {
    const ref = React.createRef();
    render(
      <FeaturePopover visible>
        <FeaturePopover.Popper tag='div' ref={ref} />
      </FeaturePopover>,
    );
    expect(ref.current.nodeName).toBe('DIV');
  });

  test('Verify supports children', async () => {
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
});
