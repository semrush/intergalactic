import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useBox } from '@semcore/flex-box';
import resolveColor, { shade } from '@semcore/utils/lib/color';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import styles from './style/icon.shadow.css';

// TODO: сделать useIcon?
function Icon(props, ref) {
  const [SIcon, other] = useBox(
    {
      tag: 'svg',
      'data-ui-name': 'Icon',
      width: 16,
      height: 16,
      viewBox: '0 0 16 16',
      ...props,
    },
    ref,
  );

  const { interactive, color: colorProps } = props;
  const color = resolveColor(colorProps);
  const { keyboardFocused, ...propsWithKeyboardEnhance } = keyboardFocusEnhance()({
    disabled: !interactive,
    ...other,
  });

  return sstyled(styles)(
    <SIcon
      use:color={color}
      color-interactive={shade(color, -0.12)}
      interactive={interactive}
      {...propsWithKeyboardEnhance}
    />,
  );
}

Icon.displayName = 'Icon';

export default createBaseComponent(Icon);
