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
    props: { children: <DragAndDrop.Draggable>Item</DragAndDrop.Draggable> },
    expectedDataUiName: 'DragAndDrop',
  });

  shouldHaveDataUiName({
    Component: DragAndDrop.Draggable,
    Wrapper: DragAndDrop,
    props: { children: 'Item' },
    expectedDataUiName: 'DragAndDrop.Draggable',
  });

  shouldHaveDataUiName({
    Component: DragAndDrop.DropZone,
    Wrapper: DragAndDrop,
    props: { children: 'DropZone' },
    expectedDataUiName: 'DragAndDrop.DropZone',
  });
});
