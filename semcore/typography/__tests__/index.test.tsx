import * as React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import Question from '@semcore/icon/Question/m';
import { List,  Hint } from '../src';

import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('typography Dependency imports', () => {
  runDependencyCheckTests('typography');
});

describe('List', () => {
  beforeEach(cleanup);
  test('Default List.Item should have display block for content', async ({ task }) => {
    const component = (
      <List>
        <List.Item marker={null} data-testid={'itemToCheck'}>
          List item
        </List.Item>
      </List>
    );
    const { getByTestId } = render(component);
    expect(getComputedStyle(getByTestId('itemToCheck').children[0]).display).toBe('block');
  });

  test('Nested List.Item should have display flex for content', async ({ task }) => {
    const component = (
      <List>
        <List.Item marker={null} data-testid={'itemToCheck'}>
          List item 3
          <List>
            <List.Item data-testid={'itemToCheckFlex'}>List item</List.Item>
          </List>
        </List.Item>
      </List>
    );
    const { getByTestId } = render(component);
    expect(getComputedStyle(getByTestId('itemToCheckFlex')).display).toBe('flex');
  });
});

describe('Hint', () => {
  beforeEach(cleanup);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = <Hint>Hint</Hint>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with Addon and Text', async ({ task }) => {
    const component = (
      <Hint>
        <Hint.Addon>
          <Question />
        </Hint.Addon>
        <Hint.Text>Test</Hint.Text>
        <Hint.Addon>
          <Question />
        </Hint.Addon>
      </Hint>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Renders correctly with alternative api Addon and Text', async ({ task }) => {
    const component = (
      <Hint addonLeft={Question} addonRight={Question}>
        Test
      </Hint>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support active', async ({ task }) => {
    const component = (
      <>
        <Hint active>Hint</Hint> <Hint id='hint'>Hint</Hint>
      </>
    );

    await expect(
      await snapshot(component, {
        actions: {
          active: '#hint',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support hover', async ({ task }) => {
    const component = <Hint id='hint'>Hint</Hint>;

    await expect(
      await snapshot(component, {
        actions: {
          hover: '#hint',
        },
      }),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support disabled', async ({ task }) => {
    const component = <Hint disabled>Hint</Hint>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support keyboardFocused', async ({ task }) => {
    const component = <Hint keyboardFocused>Hint</Hint>;

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(<Hint>Lorem ipsum dolor</Hint>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
