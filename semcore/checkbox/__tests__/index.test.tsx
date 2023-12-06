import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import * as sharedTests from '@semcore/testing-utils/shared-tests';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

const { shouldSupportClassName, shouldSupportRef } = sharedTests;

import Checkbox from '../src';

describe('Checkbox', () => {
  beforeEach(cleanup);

  shouldSupportClassName(Checkbox);
  shouldSupportRef(Checkbox);
  shouldSupportClassName(Checkbox.Value, Checkbox);
  shouldSupportRef(Checkbox.Value, Checkbox);
  shouldSupportClassName(Checkbox.Text, Checkbox);
  shouldSupportRef(Checkbox.Text, Checkbox);

  test.concurrent('Renders correctly', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Checkbox>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox checked>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should not be check icon in unchecked and disabled state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px' style={{ backgroundColor: '#b880ff' }}>
        <Checkbox checked={false} disabled={true}>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support sizes', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Checkbox size='l'>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox size='m'>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support normal state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Checkbox disabled>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox checked>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox checked disabled>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox checked>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support invalid state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Checkbox state='invalid'>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' disabled>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' checked>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' checked disabled>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' checked>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support intermediate state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Checkbox indeterminate>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox disabled indeterminate>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox indeterminate>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox indeterminate>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox indeterminate disabled>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox indeterminate>
          <Checkbox.Value checked keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' indeterminate disabled>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' indeterminate>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' indeterminate>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' indeterminate disabled>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid' indeterminate>
          <Checkbox.Value checked keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support themes', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Checkbox theme='pink'>
          <Checkbox.Value />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme='pink' disabled>
          <Checkbox.Value />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme='pink'>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme='pink'>
          <Checkbox.Value checked />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme='pink' disabled>
          <Checkbox.Value checked />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
        <Checkbox theme='pink'>
          <Checkbox.Value checked keyboardFocused />
          <Checkbox.Text>Princess</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test('a11y', async () => {
    const { container } = render(
      <Checkbox>
        <Checkbox.Value />
        <Checkbox.Text>Checkbox</Checkbox.Text>
      </Checkbox>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('a11y indeterminate', async () => {
    const { getByTestId } = render(
      <Checkbox>
        <Checkbox.Value>
          <Checkbox.Value.Control indeterminate data-testid={'checkboxControl'} />
          <Checkbox.Text>Checkbox</Checkbox.Text>
        </Checkbox.Value>
      </Checkbox>,
    );

    const checkboxControl: any = getByTestId('checkboxControl');

    expect(checkboxControl.indeterminate).toEqual(true);
    expect(checkboxControl['aria-checked']).toEqual(undefined);
  });
});
