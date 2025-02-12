import React from 'react';
import { IRootComponentProps, Root, sstyled } from '@semcore/core';
import Button from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';
import { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';

export function ClearAll(
  props: IRootComponentProps & { isHidden: boolean; getI18nText: ReturnType<typeof useI18n> },
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
