import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';

function Scale(props, ref) {
  const keyframesKey = React.useMemo(() => {
    if (props.placement.startsWith('left')) return 'left';
    if (props.placement.startsWith('right')) return 'right';
    if (props.placement.startsWith('bottom')) return 'bottom';
    if (props.placement.startsWith('top')) return 'top';

    return 'top';
  }, [props.placement]);

  return sstyled(style)(
    <Animation
      ref={ref}
      {...props}
      keyframes={[style[`@scale-${keyframesKey}-in`], style[`@scale-${keyframesKey}-out`]]}
    />,
  );
}

Scale.displayName = 'Scale';

export default createBaseComponent(Scale);
