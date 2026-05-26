import { shouldHaveDataUiName, runDependencyCheckTests } from '@semcore/testing-utils/shared-tests';
import { describe } from '@semcore/testing-utils/vitest';
import React from 'react';

import DragAndDrop from '../src';

describe('drag-and-drop Dependency imports', () => {
  runDependencyCheckTests('drag-and-drop');
});

describe('DragAndDrop data-ui-name', () => {
  shouldHaveDataUiName({
    Component: DragAndDrop,
    props: {
      'aria-label': 'Drag and drop',
      'children': <DragAndDrop.Draggable aria-label='Draggable item'>Item</DragAndDrop.Draggable>,
    },
    expectedDataUiName: 'DragAndDrop',
  });

  const DragAndDropWrapper = ({ children }: { children: React.ReactNode }) => (
    <DragAndDrop aria-label='Drag and drop'>{children}</DragAndDrop>
  );

  shouldHaveDataUiName({
    Component: DragAndDrop.Draggable,
    Wrapper: DragAndDropWrapper,
    props: { 'aria-label': 'Draggable item', 'children': 'Item' },
    expectedDataUiName: 'DragAndDrop.Draggable',
  });

  shouldHaveDataUiName({
    Component: DragAndDrop.DropZone,
    Wrapper: DragAndDropWrapper,
    props: { 'aria-label': 'Drop zone', 'children': 'DropZone' },
    expectedDataUiName: 'DragAndDrop.DropZone',
  });
});
