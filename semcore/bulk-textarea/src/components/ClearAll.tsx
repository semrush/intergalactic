import Button from '@semcore/button';
import { type IRootComponentProps, Root, sstyled } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import CloseM from '@semcore/icon/Close/m';
import React from 'react';

export function ClearAll(
  props: IRootComponentProps & { isHidden: boolean; getI18nText: ReturnType<typeof useI18n> },
) {
  const SButton = Root();
  return (
    !props.isHidden &&
    sstyled(props.styles)(
      // @ts-ignore
      <SButton render={Button} theme='muted' use='tertiary' addonLeft={CloseM}>
        {props.getI18nText('BulkTextarea.ClearAllButton.buttonText')}
      </SButton>,
    )
  );
}
