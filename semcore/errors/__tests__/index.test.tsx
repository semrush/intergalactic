import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render, screen, userEvent } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, it, expect, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import BaseError, { PageError } from '../src';

describe('errors Dependency imports', () => {
  runDependencyCheckTests('errors');
});

describe('Error', () => {
  beforeEach(cleanup);

  it('Verify data-ui-name', () => {
    const error = (
      <BaseError icon='error.svg'>
        <BaseError.Title>Error title</BaseError.Title>
        <BaseError.Description>Error description</BaseError.Description>
        <BaseError.Controls>Controls</BaseError.Controls>
      </BaseError>
    );

    const { container } = render(error);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});

describe('PageError', () => {
  beforeEach(cleanup);

  it('Verify data-ui-name', () => {
    const pageError = <PageError />;

    const { container } = render(pageError);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });

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
