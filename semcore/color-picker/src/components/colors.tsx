import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import MathPlusM from '@semcore/icon/MathPlus/m';
// import a11yEnhance from '@semcore/utils/lib/enhances/a11yEnhance';
// import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import ColorPicker, { PaletteManager } from '../index';

type ColorsAsProps = {
  styles?: React.CSSProperties;
  colors?: string[];
  Children: any;
};

type ColorsCustomAsProps = ColorsAsProps & {
  onPlusButtonClick?: React.MouseEventHandler;
};

const optionsA11yEnhance = {
  childSelector: ['role', 'tab'],
  findSelectedItem: (e) => {
    return (
      e.currentTarget.querySelector('[data-keyboard-focus="true"]') ||
      e.currentTarget.querySelector('[aria-selected="true"]')
    );
  },
  onNeighborChange: (neighborElement) => {
    console.log(neighborElement);
    // if (neighborElement) {
    //   neighborElement.focus();
    //   neighborElement.click();
    // }
  },
};

export function Colors(props: ColorsAsProps) {
  const { Children, styles, colors } = props;
  const SColors = Root;

  return sstyled(styles)(
    <SColors render={Box} role="tablist">
      {Children.origin ? (
        <Children />
      ) : (
        colors.map((color) => <ColorPicker.Item value={color} key={color} role="tab" />)
      )}
    </SColors>,
  ) as React.ReactElement;
}

// Colors.enhance = [a11yEnhance(optionsA11yEnhance), keyboardFocusEnhance()];

export function ColorsCustom(props: ColorsCustomAsProps) {
  const { Children, styles, colors, onPlusButtonClick } = props;
  const SColors = Root;
  const SPlusButton = 'div';

  return sstyled(styles)(
    <SColors render={Box} role="tablist">
      {Children.origin ? (
        <Children />
      ) : (
        colors.map((color) => <PaletteManager.Item value={color} key={color} role="tab" />)
      )}
      <SPlusButton onClick={onPlusButtonClick}>
        <MathPlusM color="#6C6E79" />
      </SPlusButton>
    </SColors>,
  ) as React.ReactElement;
}

// ColorsCustom.enhance = [a11yEnhance(optionsA11yEnhance), keyboardFocusEnhance()];
