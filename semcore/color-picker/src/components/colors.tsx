import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import MathPlusM from '@semcore/icon/MathPlus/m';
import ColorPicker, { IColorsProps } from '..';
import { PaletteManager } from '../ColorPicker';

export function Colors(props: IColorsProps) {
  const { Children, styles, colors } = props;
  const SColors = Root;

  return sstyled(styles)(
    <SColors render={Box}>
      {Children.origin ? (
        <Children />
      ) : (
        colors.map((color) => <ColorPicker.Item value={color} key={color} />)
      )}
    </SColors>,
  ) as React.ReactElement;
}

export function ColorsCustom(props: IColorsProps) {
  const { Children, styles, colors, onPlusButtonClick } = props;
  const SColors = Root;
  const SPlusButton = 'div';

  return sstyled(styles)(
    <SColors render={Box}>
      {Children.origin ? (
        <Children />
      ) : (
        colors.map((color) => <PaletteManager.Item value={color} key={color} />)
      )}
      <SPlusButton onClick={onPlusButtonClick}>
        <MathPlusM color="#6C6E79" />
      </SPlusButton>
    </SColors>,
  ) as React.ReactElement;
}
