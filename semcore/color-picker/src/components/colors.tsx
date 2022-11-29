import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import MathPlusM from '@semcore/icon/MathPlus/m';
import ColorPicker, { PaletteManager } from '../index';

type ColorsAsProps = {
  styles?: React.CSSProperties;
  colors?: string[];
  Children: any;
};

type ColorsCustomAsProps = ColorsAsProps & {
  onPlusButtonClick?: React.MouseEventHandler;
};

export function Colors(props: ColorsAsProps) {
  const { Children, styles, colors } = props;
  const SColors = Root;

  return sstyled(styles)(
    <SColors render={Box} role="list" aria-label="Preset colors">
      {Children.origin ? (
        <Children />
      ) : (
        colors.map((color) => <ColorPicker.Item value={color} key={color} />)
      )}
    </SColors>,
  ) as React.ReactElement;
}

export function ColorsCustom(props: ColorsCustomAsProps) {
  const { Children, styles, colors, onPlusButtonClick } = props;
  const SColors = Root;
  const SPlusButton = 'div';

  return sstyled(styles)(
    <SColors render={Box} role="list" aria-label="Custom color field container">
      {Children.origin ? (
        <Children />
      ) : (
        colors.map((color) => <PaletteManager.Item value={color} key={color} />)
      )}
      <SPlusButton onClick={onPlusButtonClick} aria-hidden="true">
        <MathPlusM color="gray-500" />
      </SPlusButton>
    </SColors>,
  ) as React.ReactElement;
}
