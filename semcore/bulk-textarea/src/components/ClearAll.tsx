import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { Root, sstyled } from '@semcore/core';
import CloseM from '@semcore/icon/Close/m';
import React from 'react';

import type { BulkTextareaRootType } from '../BulkTextarea';
import type { NSBulktextarea } from '../BulkTextarea.types';

export function ClearAll(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSBulktextarea.ClearAll.Component,
    BulkTextareaRootType,
    'ClearAll'
  >,
) {
  const SButton = Root;
  return (
    !props.isHidden &&
    sstyled(props.styles)(
      <SButton render={Button} theme='muted' use='tertiary' addonLeft={CloseM}>
        {props.getI18nText('BulkTextarea.ClearAllButton.buttonText')}
      </SButton>,
    )
  );
}
