import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { opacity } from '@semcore/utils/lib/color';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

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
  const SCloseIcon = 'svg';
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
        <SCloseIcon
          onClick={onRemove}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="12" height="12" rx="6" fill="white" />
          <path
            d="M8.73316 3.26684C9.08895 3.62263 9.08895 4.19948 8.73316 4.55526L7.28842 6L8.73316 7.44474C9.08895 7.80052 9.08895 8.37737 8.73316 8.73316C8.37737 9.08895 7.80052 9.08895 7.44474 8.73316L6 7.28842L4.55526 8.73316C4.19948 9.08895 3.62263 9.08895 3.26684 8.73316C2.91105 8.37737 2.91105 7.80052 3.26684 7.44473L4.71158 6L3.26684 4.55527C2.91105 4.19948 2.91105 3.62263 3.26684 3.26684C3.62263 2.91105 4.19948 2.91105 4.55526 3.26684L6 4.71158L7.44474 3.26684C7.80052 2.91105 8.37737 2.91105 8.73316 3.26684Z"
            fill="#6C6E79"
          />
        </SCloseIcon>
      )}
    </SItemContainer>,
  ) as React.ReactElement;
}

Item.enhance = [keyboardFocusEnhance()];
