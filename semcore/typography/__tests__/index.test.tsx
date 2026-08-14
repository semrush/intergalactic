import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import * as React from 'react';

import { Blockquote, List, Text } from '../src';

describe('typography Dependency imports', () => {
  runDependencyCheckTests('typography');
});

describe('Typography', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const typography = (
      <>
        <Text>Text</Text>
        <Blockquote author='Author'>Quote</Blockquote>
        <List>
          <List.Item>
            <List.Item.Content>Item</List.Item.Content>
          </List.Item>
        </List>
      </>
    );

    const { container } = render(typography);
    expect(extractUIName(container)).toMatchSnapshot();
  });
});

describe('List', () => {
  beforeEach(cleanup);
  test('Default List.Item should have display block for content', async () => {
    const component = (
      <List>
        <List.Item marker={null} data-testid='itemToCheck'>
          List item
        </List.Item>
      </List>
    );
    const { getByTestId } = render(component);
    expect(getComputedStyle(getByTestId('itemToCheck').children[0]).display).toBe('block');
  });

  test('Nested List.Item should have display flex for content', async () => {
    const component = (
      <List>
        <List.Item marker={null} data-testid='itemToCheck'>
          List item 3
          <List>
            <List.Item data-testid='itemToCheckFlex'>List item</List.Item>
          </List>
        </List.Item>
      </List>
    );
    const { getByTestId } = render(component);
    expect(getComputedStyle(getByTestId('itemToCheckFlex')).display).toBe('flex');
  });
});
