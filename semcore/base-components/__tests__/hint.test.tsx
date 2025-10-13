import { expect, test, describe } from '@semcore/testing-utils/vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import React, { useRef } from 'react';

import { Hint } from '../src';

describe('Hint', () => {
  test('Verify content is rendered into body', async () => {
    const TestComponent = () => {
      const ref = useRef<HTMLButtonElement>(null);

      return (
        <div data-testid='parent'>
          <button ref={ref} data-testid='trigger'>
            Hover me
          </button>
          <Hint triggerRef={ref} placement='right' data-testid='hint-content'>
            <div>Hint text</div>
          </Hint>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    fireEvent.mouseEnter(getByTestId('trigger'));
    await waitFor(() => {
      const hint = document.body.querySelector('[data-testid="hint-content"]');
      expect(hint).not.toBeNull();
      expect(hint?.textContent).toBe('Hint text');
    });

    expect(getByTestId('parent').querySelector('[data-testid="hint-content"]')).toBeNull();
  });
});
