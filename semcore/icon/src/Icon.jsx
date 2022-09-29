import React from 'react';
import cn from 'classnames';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useBox } from '@semcore/flex-box';
import resolveColor, { shade } from '@semcore/utils/lib/color';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import propsForElement from '@semcore/utils/lib/propsForElement';
import logger from '@semcore/utils/lib/logger';

import styles from './style/icon.shadow.css';

function Icon(props, ref) {
  const [SIcon, other] = useBox(
    {
      tag: 'svg',
      'data-ui-name': 'Icon',
      width: 16,
      height: 16,
      viewBox: '0 0 16 16',
      'aria-hidden': true,
      focusable: props.interactive,
      ...props,
    },
    ref,
  );

  const {
    interactive,
    color: colorProps,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  } = props;
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

  function onKeyDown(event) {
    if (props.onKeyDown) {
      return props.onKeyDown(event);
    }

    if (interactive && event.code === 'Enter') {
      props.onClick && props.onClick(event);
    }
  }

  logger.warn(
    interactive && !ariaLabel && !ariaLabelledby,
    "'aria-label' or 'aria-labelledby' are required props for interactive icons",
    props['data-ui-name'] || Icon.displayName,
  );

  return (
    <SIcon
      {...propsForElement(propsWithKeyboardEnhance)}
      style={Object.assign({}, style, propsWithKeyboardEnhance.style, props.style)}
      className={cn(className, propsWithKeyboardEnhance.className, props.className) || undefined}
      onKeyDown={onKeyDown}
      role={interactive ? 'button' : undefined}
      aria-hidden={interactive ? undefined : 'true'}
    />
  );
}

Icon.displayName = 'Icon';

export default createBaseComponent(Icon);
