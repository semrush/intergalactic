import React from 'react';
import cn from 'classnames';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useBox } from '@semcore/flex-box';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import logger from '@semcore/core/lib/utils/logger';
import { useForkRef } from '@semcore/core/lib/utils/ref';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';

import styles from './style/icon.shadow.css';

function Icon(props, ref) {
  const [SIcon, other] = useBox(
    {
      tag: 'svg',
      'data-ui-name': 'Icon',
      width: 16,
      height: 16,
      viewBox: '0 0 16 16',
      focusable: props.interactive,
      ...props,
    },
    ref,
  );

  const { interactive, color: colorProps } = props;
  const resolveColor = useColorResolver();
  const color = resolveColor(colorProps);
  const { keyboardFocused, ...propsEnhance } = keyboardFocusEnhance()({
    disabled: !interactive,
    ...other,
  });
  const sstyles = sstyled(styles);
  const { className, style } = sstyles.cn('SIcon', {
    'use:color': color,
    interactive: interactive,
    keyboardFocused: keyboardFocused,
  });

  function onKeyDown(event) {
    if (propsEnhance.onKeyDown) {
      return propsEnhance.onKeyDown(event);
    }

    if (interactive && propsEnhance.onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      propsEnhance.onClick(event);
    }
  }

  const labelCheckRef = React.useRef();
  React.useEffect(() => {
    if (!interactive) return;
    if (process.env.NODE_ENV !== 'production') {
      logger.warn(
        labelCheckRef.current && !hasLabels(labelCheckRef.current),
        `'aria-label' or 'aria-labelledby' are required props for interactive icons`,
        props['data-ui-name'] || Icon.displayName,
      );
    }
  }, [interactive]);
  const forkedRef = useForkRef(ref, labelCheckRef);

  return (
    <SIcon
      role={interactive ? 'button' : undefined}
      aria-hidden={interactive ? undefined : 'true'}
      {...propsForElement(propsEnhance)}
      style={Object.assign({}, style, propsEnhance.style)}
      className={cn(className, propsEnhance.className) || undefined}
      onKeyDown={onKeyDown}
      ref={forkedRef}
    />
  );
}

Icon.displayName = 'Icon';

export default createBaseComponent(Icon);
