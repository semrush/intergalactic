import Link from '@semcore/link';
import { runComponentContractTests, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, expect, test, describe } from '@semcore/testing-utils/vitest';
import React from 'react';

import Button, { ButtonLink } from '../src';

describe('Button Dependency imports', () => {
  runDependencyCheckTests('button');
});

describe('Button', () => {
  beforeEach(cleanup);

  runComponentContractTests({
    Component: Button,
    props: { children: 'Button' },
    expectedDataUiName: 'Button',
    preset: ['root', 'interactive'],
    include: ['tag'],
    tagCases: [
      { tag: 'a', expectedTagName: 'A', props: { href: '#' } },
      { tag: Link, name: 'Link', expectedTagName: 'A', props: { href: '#' } },
    ],
  });

  runComponentContractTests({
    Component: Button.Text,
    props: { children: 'Button text' },
    expectedDataUiName: 'Button.Text',
    preset: 'root',
  });

  runComponentContractTests({
    Component: Button.Addon,
    props: { children: <span>Addon</span> },
    expectedDataUiName: 'Button.Addon',
    preset: 'root',
  });

  runComponentContractTests({
    Component: ButtonLink,
    props: { children: 'ButtonLink' },
    expectedDataUiName: 'ButtonLink',
    preset: 'root',
  });

  test('Verify loading attributes', () => {
    const { queryByTestId } = render(
      <Button data-testid='button' loading>
        Text
      </Button>,
    );
    expect((queryByTestId('button')?.attributes as any)['disabled']).toBeTruthy();
    expect(queryByTestId('button')?.querySelectorAll('[data-ui-name="Spin"]')).toHaveLength(1);
  });

  test('Verify aria-busy when loading', () => {
    const { queryByTestId } = render(
      <Button data-testid='busy-button' loading>
        Text
      </Button>,
    );

    const buttonElement = queryByTestId('busy-button');

    expect((buttonElement?.attributes as any)['aria-busy'].value).toBe('true');
  });
});
