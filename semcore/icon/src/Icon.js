import React from 'react';
import cn from 'classnames';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useBox } from '@semcore/flex-box';
import resolveColor, { shade } from '@semcore/utils/lib/color';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import propsForElement from '@semcore/utils/lib/propsForElement';

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
  const sstyles = sstyled(styles);
  const { className, style } = sstyles.cn('SIcon', {
    'color-interactive': shade(color, -0.12),
    'use:color': color,
    interactive: interactive,
    keyboardFocused: keyboardFocused,
  });

  return (
    <SIcon
      {...propsForElement(propsWithKeyboardEnhance)}
      style={Object.assign({}, style, props.style)}
      className={cn(className, props.className) || undefined}
    />
  );
}

Icon.displayName = 'Icon';

export default createBaseComponent(Icon);
