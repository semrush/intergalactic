import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { opacity } from '@semcore/utils/lib/color';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import CloseM from '@semcore/icon/Close/m';

type ItemAsProps = {
  styles?: React.CSSProperties;
  value?: string;
  displayLabel?: boolean;
  editable?: boolean;
  selected?: boolean;
  onRemove?: React.MouseEventHandler;
  Children?: React.FC;
};

export function Item(props: ItemAsProps) {
  const { Children, styles, value, displayLabel, editable, selected, onRemove } = props;
  const SItemContainer = Root;
  const SLabel = Box;
  const SCloseIcon = Box;
  const SLine = 'svg';

  return sstyled(styles)(
    <SItemContainer
      render={Box}
      selected={selected}
      aria-selected={selected}
      value={value}
      displayLabel={displayLabel}
      lightBackground={opacity(value, 0.15)}
    >
      {!value && (
        <SLine
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="1"
            height="22"
            transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 16.4854 0.928925)"
            fill="#e0e1e9"
          />
        </SLine>
      )}
      {displayLabel && <SLabel value={value || '#6C6E79'}>A</SLabel>}
      <Children />
      {editable && (
        <SCloseIcon onClick={onRemove}>
          <CloseM color="gray-500" w={10} h={10} />
        </SCloseIcon>
      )}
    </SItemContainer>,
  ) as React.ReactElement;
}

Item.enhance = [keyboardFocusEnhance()];
