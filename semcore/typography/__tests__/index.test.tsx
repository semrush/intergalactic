import * as React from 'react';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { List } from '../src';

import { cleanup, render } from '@semcore/testing-utils/testing-library';
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
