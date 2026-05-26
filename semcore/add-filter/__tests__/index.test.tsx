import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, waitFor, userEvent } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import AddFilter from '../src';

describe('AddFilter Dependency imports', () => {
  runDependencyCheckTests('add-filter');
});

describe('AddFilter data-ui-name', () => {
  shouldHaveDataUiName({
    Component: AddFilter,
    props: {
      filterData: { name: '' },
      onClearAll: () => {},
      children: (
        <AddFilter.Input name='name'>
          <AddFilter.Input.Value />
        </AddFilter.Input>
      ),
    },
    expectedDataUiName: 'AddFilter',
  });
});

describe('AddFilter', () => {
  beforeEach(() => {
    cleanup();

    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('should render two menuitems in dropdown with displayName as text', async () => {
    const { queryByText, getByText } = render(
      <AddFilter filterData={{ name: '', fullname: '' }} onClearAll={() => {}}>
        <AddFilter.Input name='name' displayName='Name'>
          <AddFilter.Input.Value />
        </AddFilter.Input>
        <AddFilter.Input name='fullname' displayName='Fullname'>
          <AddFilter.Input.Value />
        </AddFilter.Input>
      </AddFilter>,
    );

    await userEvent.click(getByText('Add filter'));

    await waitFor(() => {
      expect(queryByText('Name')).toBeInTheDocument();
      expect(queryByText('Fullname')).toBeInTheDocument();
    });
  });

  test('should render two menuitems in dropdown with name as text', async () => {
    const { getByText } = render(
      <AddFilter filterData={{ name: '', fullname: '' }} onClearAll={() => {}}>
        <AddFilter.Input name='name'>
          <AddFilter.Input.Value />
        </AddFilter.Input>
        <AddFilter.Input name='fullname'>
          <AddFilter.Input.Value />
        </AddFilter.Input>
      </AddFilter>,
    );

    await userEvent.click(getByText('Add filter'));

    await waitFor(() => {
      expect(getByText('name')).toBeInTheDocument();
      expect(getByText('fullname')).toBeInTheDocument();
    });
  });
});
