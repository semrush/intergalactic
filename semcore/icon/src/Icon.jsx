import { useBox } from '@semcore/base-components';
import { createBaseComponent, sstyled } from '@semcore/core';
import hasLabels from '@semcore/core/lib/utils/hasLabels';
import logger from '@semcore/core/lib/utils/logger';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import { useForkRef } from '@semcore/core/lib/utils/ref';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import cn from 'classnames';
import React from 'react';

import styles from './style/icon.shadow.css';

function Icon(props, ref) {
  const [SIcon, other] = useBox(
    {
      'tag': 'svg',
      'data-ui-name': 'Icon',
      'width': 16,
      'height': 16,
      'viewBox': '0 0 16 16',
      'focusable': props.interactive,
      ...props,
    },
    ref,
  );

  const { interactive, color: colorProps } = props;
  const resolveColor = useColorResolver();
  const color = resolveColor(colorProps);

  const sstyles = sstyled(styles);
  const { className, style } = sstyles.cn('SIcon', {
    'use:color': color,
    'interactive': interactive,
  });

  function onKeyDown(event) {
    if (other.onKeyDown) {
      return other.onKeyDown(event);
    }

    if (interactive && other.onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      other.onClick(event);
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
      {...propsForElement(other)}
      style={Object.assign({}, style, other.style)}
      className={cn(className, other.className) || undefined}
      onKeyDown={onKeyDown}
      ref={forkedRef}
    />
  );
}

Icon.displayName = 'Icon';

export default createBaseComponent(Icon);
