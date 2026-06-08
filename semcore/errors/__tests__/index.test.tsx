import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, screen, userEvent } from '@semcore/testing-utils/testing-library';
import { describe, it, expect, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Error, { AccessDenied, Maintenance, PageError, PageNotFound, ProjectNotFound } from '../src';

describe('errors Dependency imports', () => {
  runDependencyCheckTests('errors');
});

describe('Errors data-ui-name', () => {
  shouldHaveDataUiName({
    Component: Error,
    expectedDataUiName: 'Error',
  });

  shouldHaveDataUiName({
    Component: AccessDenied,
    expectedDataUiName: 'AccessDenied',
  });

  shouldHaveDataUiName({
    Component: Maintenance,
    expectedDataUiName: 'Maintenance',
  });

  shouldHaveDataUiName({
    Component: PageError,
    expectedDataUiName: 'PageError',
  });

  shouldHaveDataUiName({
    Component: PageNotFound,
    expectedDataUiName: 'PageNotFound',
  });

  shouldHaveDataUiName({
    Component: ProjectNotFound,
    props: {
      locale: 'en-US',
      i18n: {
        'en-US': {
          title: 'Project not found',
          text: 'Project not found',
          btnProjects: 'Go to Projects',
          btnContacts: 'Contact us',
        },
      },
    },
    expectedDataUiName: 'ProjectNotFound',
  });
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
