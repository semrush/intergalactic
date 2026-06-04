import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render, cleanup, waitFor, userEvent, act } from '@semcore/testing-utils/testing-library';
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

  test('should open Select and Dropdown filters after mount timer', () => {
    vi.useFakeTimers();

    try {
      const selectVisibleChange = vi.fn();
      const dropdownVisibleChange = vi.fn();

      const { queryByText, getByText } = render(
        <>
          <AddFilter.Select
            name='color'
            disablePortal
            onVisibleChange={selectVisibleChange}
          >
            <AddFilter.Select.Trigger aria-label='Color' placeholder='Color' />
            <AddFilter.Select.Menu>
              <AddFilter.Select.Option value='blue'>Blue</AddFilter.Select.Option>
            </AddFilter.Select.Menu>
          </AddFilter.Select>

          <AddFilter.Dropdown
            name='keywords'
            disablePortal
            onVisibleChange={dropdownVisibleChange}
          >
            <AddFilter.Dropdown.Trigger placeholder='Keywords' onClear={() => {}}>
              Keywords
            </AddFilter.Dropdown.Trigger>
            <AddFilter.Dropdown.Popper aria-label='Keywords'>
              Dropdown content
            </AddFilter.Dropdown.Popper>
          </AddFilter.Dropdown>
        </>,
      );

      expect(queryByText('Blue')).not.toBeInTheDocument();
      expect(queryByText('Dropdown content')).not.toBeInTheDocument();
      expect(selectVisibleChange).not.toHaveBeenCalled();
      expect(dropdownVisibleChange).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(selectVisibleChange).toHaveBeenCalledWith(true);
      expect(dropdownVisibleChange).toHaveBeenCalledWith(true);
      expect(getByText('Blue')).toBeInTheDocument();
      expect(getByText('Dropdown content')).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
