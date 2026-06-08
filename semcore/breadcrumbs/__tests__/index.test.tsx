import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { afterEach, beforeEach, describe, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import Breadcrumbs from '../src';

describe('breadcrumbs Dependency imports', () => {
  runDependencyCheckTests('breadcrumbs');
});

describe('Breadcrumbs data-ui-name', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    const originalConsoleError = console.error;

    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation((message?: any, ...args: any[]) => {
        const consoleErrorText = [message, ...args]
          .filter((arg) => typeof arg === 'string')
          .join(' ');
        const isBreadcrumbsDefaultPropsWarning =
          typeof message === 'string' &&
          message.includes('Support for defaultProps will be removed') &&
          (consoleErrorText.includes('FunctionMemoComponent') || consoleErrorText.includes('Item'));

        if (isBreadcrumbsDefaultPropsWarning) return;

        originalConsoleError(message, ...args);
      });
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  shouldHaveDataUiName({
    Component: Breadcrumbs,
    props: { children: 'Breadcrumbs' },
    expectedDataUiName: 'Breadcrumbs',
  });

  shouldHaveDataUiName({
    Component: Breadcrumbs.Item,
    Wrapper: Breadcrumbs,
    props: { children: 'Item' },
    expectedDataUiName: 'Breadcrumbs.Item',
  });
});
