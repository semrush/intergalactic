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
  const SLabel = 'svg';
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
            height="23"
            transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 16.4854 0.928925)"
            fill="#c4c7cf"
          />
        </SLine>
      )}
      {displayLabel && (
        <SLabel
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.61769 10C7.51308 9.65368 7.3942 9.29774 7.26106 8.93218C7.13742 8.56662 7.01379 8.20106 6.89016 7.8355H3.03852C2.91488 8.20106 2.7865 8.56662 2.65335 8.93218C2.52972 9.29774 2.4156 9.65368 2.31098 10H0C0.370899 8.92256 0.722777 7.92689 1.05563 7.01299C1.38849 6.09909 1.71184 5.2381 2.02568 4.43001C2.34903 3.62193 2.66286 2.85714 2.96719 2.13564C3.28103 1.40452 3.60437 0.69264 3.93723 0H6.06277C6.38612 0.69264 6.70471 1.40452 7.01855 2.13564C7.33238 2.85714 7.64622 3.62193 7.96006 4.43001C8.28341 5.2381 8.61151 6.09909 8.94436 7.01299C9.27722 7.92689 9.6291 8.92256 10 10H7.61769ZM4.95007 2.26551C4.90252 2.40981 4.83119 2.60702 4.73609 2.85714C4.64099 3.10726 4.53162 3.39586 4.40799 3.72294C4.28436 4.05002 4.14646 4.41077 3.99429 4.8052C3.85164 5.19962 3.70423 5.61328 3.55207 6.04618H6.36234C6.21018 5.61328 6.06277 5.19962 5.92011 4.8052C5.77746 4.41077 5.63956 4.05002 5.50642 3.72294C5.38279 3.39586 5.27342 3.10726 5.17832 2.85714C5.08321 2.60702 5.00713 2.40981 4.95007 2.26551Z"
            fill={value || '#6C6E79'}
          />
        </SLabel>
      )}
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
