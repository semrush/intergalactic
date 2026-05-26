import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import InlineEdit from '../src';

const EditableInlineEdit = ({ children }: { children: React.ReactNode }) => (
  <InlineEdit editable>{children}</InlineEdit>
);

describe('inline-edit Dependency imports', () => {
  runDependencyCheckTests('inline-edit');
});

describe('InlineEdit data-ui-name', () => {
  shouldHaveDataUiName({
    Component: InlineEdit,
    props: {
      children: (
        <>
          <InlineEdit.View>View</InlineEdit.View>
          <InlineEdit.Edit>Edit</InlineEdit.Edit>
        </>
      ),
    },
    expectedDataUiName: 'InlineEdit',
  });

  shouldHaveDataUiName({
    Component: InlineEdit.View,
    Wrapper: InlineEdit,
    props: { children: 'View' },
    expectedDataUiName: 'InlineEdit.View',
  });

  shouldHaveDataUiName({
    Component: InlineEdit.Edit,
    Wrapper: EditableInlineEdit,
    props: { children: 'Edit' },
    expectedDataUiName: 'InlineEdit.Edit',
  });
});

describe('InlineEdit', () => {
  test('Verify throws error when rendered without children', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<InlineEdit />)).toThrow(
      '<InlineEdit /> component cannot be rendered without children',
    );
    errorSpy.mockRestore();
  });
});
