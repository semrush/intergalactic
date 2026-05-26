import { shouldHaveDataUiName } from '@semcore/testing-utils/shared-tests';
import { expect, test, describe } from '@semcore/testing-utils/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Animation, Collapse, FadeInOut, Scale, Slide, Transform } from '../src';

describe('Animation', () => {
  shouldHaveDataUiName({
    Component: Animation,
    props: { visible: true, children: 'Animation' },
    expectedDataUiName: 'Animation',
  });

  shouldHaveDataUiName({
    Component: Transform,
    props: { visible: true, children: 'Transform' },
    expectedDataUiName: 'Transform',
  });

  shouldHaveDataUiName({
    Component: FadeInOut,
    props: { visible: true, children: 'FadeInOut' },
    expectedDataUiName: 'FadeInOut',
  });

  shouldHaveDataUiName({
    Component: Collapse,
    props: { visible: true, children: 'Collapse' },
    expectedDataUiName: 'Collapse',
  });

  shouldHaveDataUiName({
    Component: Scale,
    props: { visible: true, children: 'Scale' },
    expectedDataUiName: 'Scale',
  });

  shouldHaveDataUiName({
    Component: Slide,
    props: { visible: true, slideOrigin: 'left', children: 'Slide' },
    expectedDataUiName: 'Slide',
  });

  test('Verify not renders when visible is false and preserveNode is false', () => {
    render(
      <Animation visible={false} preserveNode={false}>
        Content
      </Animation>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('Verify preserve node when preserveNode is true', () => {
    render(
      <Animation visible={false} preserveNode={true}>
        Content
      </Animation>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
