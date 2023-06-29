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
        <Checkbox>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should not be check icon in unchecked and disabled state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px' style={{ backgroundColor: '#b880ff' }}>
        <Checkbox>
          <Checkbox.Value checked={false} disabled={true} />
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
        <Checkbox>
          <Checkbox.Value disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked keyboardFocused />
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
        <Checkbox state='invalid'>
          <Checkbox.Value disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value checked />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value checked disabled />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value checked keyboardFocused />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('Should support intermediate state', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps m='5px'>
        <Checkbox>
          <Checkbox.Value indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value disabled indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value keyboardFocused indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked disabled indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox>
          <Checkbox.Value checked keyboardFocused indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value disabled indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value keyboardFocused indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value checked indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value checked disabled indeterminate />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
        <Checkbox state='invalid'>
          <Checkbox.Value checked keyboardFocused indeterminate />
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
        <Checkbox theme='pink'>
          <Checkbox.Value disabled />
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
        <Checkbox theme='pink'>
          <Checkbox.Value checked disabled />
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
});
