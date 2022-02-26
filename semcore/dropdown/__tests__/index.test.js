import React from 'react';
import { testing } from '@semcore/jest-preset-ui';
const { cleanup, axe, render } = testing;

import { snapshot } from '@semcore/jest-preset-ui';
import Dropdown from '../src';

describe('Dropdown', () => {
  afterEach(cleanup);

  test('correct style', async () => {
    const component = (
      <div style={{ width: 150, height: 60 }}>
        <Dropdown disablePortal visible>
          <Dropdown.Trigger>
            <button>default dropdown</button>
          </Dropdown.Trigger>
          <Dropdown.Popper style={{ opacity: 1 }}>
            <div>text</div>
          </Dropdown.Popper>
        </Dropdown>
      </div>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(
      <Dropdown visible disablePortal>
        <Dropdown.Trigger>
          <button>default dropdown</button>
        </Dropdown.Trigger>
        <Dropdown.Popper>
          <div>text</div>
        </Dropdown.Popper>
      </Dropdown>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
