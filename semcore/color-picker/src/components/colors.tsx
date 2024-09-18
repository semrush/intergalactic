import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import MathPlusM from '@semcore/icon/MathPlus/m/index';
import ColorPicker, { PaletteManager } from '../ColorPicker';

type ColorsAsProps = {
  styles?: React.CSSProperties;
  colors?: string[];
  Children: any;
  getI18nText: (messageId: string, values?: { [key: string]: string | number }) => string;
};

type ColorsCustomAsProps = ColorsAsProps & {
  onPlusButtonClick?: React.MouseEventHandler;
};

export function Colors(props: ColorsAsProps) {
  const { Children, styles, colors, getI18nText } = props;
  const SColors = Root;

  return sstyled(styles)(
    <SColors
      render={Box}
      role='listbox'
      aria-orientation='horizontal'
      aria-label={getI18nText('presetColors')}
    >
      {Children.origin ? (
        <Children />
      ) : (
        colors?.map((color) => <ColorPicker.Item value={color} key={color} />)
      )}
    </SColors>,
  ) as React.ReactElement;
}

export function ColorsCustom(props: ColorsCustomAsProps) {
  const { Children, styles, colors, onPlusButtonClick, getI18nText } = props;
  const SColors = Root;
  const SColorsContainer = Flex;
  const SPlusButton = 'div';

  return sstyled(styles)(
    <SColorsContainer>
      <SColors
        render={Box}
        role='listbox'
        aria-orientation='horizontal'
        aria-label={getI18nText('customColors')}
      >
        {Children.origin ? (
          <Children />
        ) : (
          colors?.map((color) => <PaletteManager.Item value={color} key={color} />)
        )}
      </SColors>
      <SPlusButton onClick={onPlusButtonClick} role='button' aria-label={getI18nText('addColor')}>
        <MathPlusM color='icon-primary-neutral' />
      </SPlusButton>
    </SColorsContainer>,
  ) as React.ReactElement;
}
