import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, screen, userEvent } from '@semcore/testing-utils/testing-library';
import { describe, it, expect, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { PageError } from '../src';

describe('errors Dependency imports', () => {
  runDependencyCheckTests('errors');
});

describe('PageError', () => {
  it('Verify calls onClick when reload button is clicked', async () => {
    const handleClick = vi.fn((event: React.MouseEvent) => {
      event.preventDefault();
      return false;
    });
    render(<PageError onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Try again/i });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
