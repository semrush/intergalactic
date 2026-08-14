import { extractUIName } from '@semcore/testing-utils/shared/extractUINameTree.ts';
import { runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { beforeEach, describe, expect, test } from '@semcore/testing-utils/vitest';
import React from 'react';

import DragAndDrop from '../src';

describe('drag-and-drop Dependency imports', () => {
  runDependencyCheckTests('drag-and-drop');
});

describe('DragAndDrop', () => {
  beforeEach(cleanup);

  test('Verify data-ui-name', () => {
    const dragAndDrop = (
      <DragAndDrop aria-label='Sortable list' onDnD={() => {}}>
        <DragAndDrop.Draggable id='first' aria-label='First item'>
          First item
        </DragAndDrop.Draggable>
        <DragAndDrop.Draggable id='second' aria-label='Second item'>
          Second item
        </DragAndDrop.Draggable>
        <DragAndDrop.DropZone aria-label='Drop zone'>
          Drop zone
        </DragAndDrop.DropZone>
      </DragAndDrop>
    );

    const { container } = render(dragAndDrop);
    const result = extractUIName(container);

    expect(result).toMatchSnapshot();
  });
});
