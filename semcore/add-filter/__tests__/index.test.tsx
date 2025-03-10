import React from 'react';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup, waitFor } from '@semcore/testing-utils/testing-library';
import AddFilter from '../src';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('AddFilter Dependency imports', () => {
  runDependencyCheckTests('add-filter');
});

describe('AddFilter', () => {
  beforeEach(cleanup);

  test('should render two menuitems in dropdown with displayName as text', async () => {
    const { queryByText, getByText } = render(
      <AddFilter filterData={{ name: '', fullname: '' }} onClearAll={() => {}}>
        <AddFilter.Input name={'name'} displayName={'Name'}>
          <AddFilter.Input.Value />
        </AddFilter.Input>
        <AddFilter.Input name={'fullname'} displayName={'Fullname'}>
          <AddFilter.Input.Value />
        </AddFilter.Input>
      </AddFilter>,
    );

    fireEvent.click(getByText('Add filter'));

    await waitFor(() => {
      expect(queryByText('Name')).toBeInTheDocument();
      expect(queryByText('Fullname')).toBeInTheDocument();
    });
  });

  test('should render two menuitems in dropdown with name as text', async () => {
    const { getByText } = render(
      <AddFilter filterData={{ name: '', fullname: '' }} onClearAll={() => {}}>
        <AddFilter.Input name={'name'}>
          <AddFilter.Input.Value />
        </AddFilter.Input>
        <AddFilter.Input name={'fullname'}>
          <AddFilter.Input.Value />
        </AddFilter.Input>
      </AddFilter>,
    );

    fireEvent.click(getByText('Add filter'));

    await waitFor(() => {
      expect(getByText('name')).toBeInTheDocument();
      expect(getByText('fullname')).toBeInTheDocument();
    });
  });
});
