import React from 'react';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';
import { render, fireEvent, cleanup, waitFor } from '@semcore/testing-utils/testing-library';
import AddFilter from '../src';
import path from 'path';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';

describe('Dependency imports', () => {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const componentPath = path.resolve(__dirname, '../src/AddFilter.tsx');
  const typePath = path.resolve(__dirname, '../src/AddFilter.types.ts');

  runDependencyCheckTests(packageJsonPath, [componentPath, typePath]);
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
