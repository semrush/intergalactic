import React from 'react';
import { IRootComponentProps, Root, sstyled } from '@semcore/core';
import Button from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';

export function ClearAllButton(props: IRootComponentProps & { isHidden: boolean }) {
  const SButton = Root;
  return (
    !props.isHidden &&
    sstyled(props.styles)(
      <SButton render={Button} theme='muted' use='tertiary' addonLeft={CloseM}>
        Clear all
      </SButton>,
    )
  );
}
