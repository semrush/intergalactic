import { Box, Flex } from '@semcore/base-components';
import { Root, sstyled } from '@semcore/core';
import MathPlusM from '@semcore/icon/MathPlus/m';
import React from 'react';

import { ColorPicker } from '../ColorPicker';
import type { ColorsCustomProps, ColorsProps } from '../ColorPicker.types';
import { PaletteManager } from '../PaletteManager';

export function Colors(props: ColorsProps) {
  const { styles, colors, getI18nText } = props;
  const SColors = Root();

  return sstyled(styles)(
    <SColors
      render={Box}
      role='listbox'
      aria-orientation='horizontal'
      aria-label={getI18nText('presetColors')}
    >
      {colors?.map((color) => <ColorPicker.Item value={color} key={color} />)}
    </SColors>,
  );
}

export function ColorsCustom(props: ColorsCustomProps) {
  const { styles, colors, onPlusButtonClick, getI18nText } = props;
  const SColors = Root();
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
        {colors?.map((color) => <PaletteManager.Item value={color} key={color} />)}
      </SColors>
      <SPlusButton onClick={onPlusButtonClick} role='button' aria-label={getI18nText('addColor')}>
        <MathPlusM color='icon-primary-neutral' />
      </SPlusButton>
    </SColorsContainer>,
  );
}
