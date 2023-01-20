import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import { cleanup, render, fireEvent } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

import Dropdown from '../src';

describe('Dropdown', () => {
  beforeEach(cleanup);

  test('Should correct enter space in input', () => {
    const spy = vi.fn();
    const { getByTestId } = render(
      <Dropdown onVisibleChange={spy} interaction="focus">
        <Dropdown.Trigger tag="input" data-testid="input" />
      </Dropdown>,
    );

    const input = getByTestId('input');

    fireEvent.keyDown(input, { key: ' ', which: 32, keyCode: 32 });
    //TODO, because input.value all time print empty string
    expect(spy).not.toHaveBeenCalled();
  });

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
        <Dropdown.Trigger tag="button" aria-label="default dropdown">
          default dropdown
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
