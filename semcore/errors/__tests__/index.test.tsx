import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe, it, expect, vi } from '@semcore/testing-utils/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { PageError } from '../src';

describe('errors Dependency imports', () => {
  runDependencyCheckTests('errors');
});

describe('PageError', () => {
  it('Verify calls onClick when reload button is clicked', () => {
    const handleClick = vi.fn();
    render(<PageError onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Try again/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
