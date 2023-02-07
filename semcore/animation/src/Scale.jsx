import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';

const style = sstyled.css`
  @keyframes vertical-in { from { opacity: 0; scale: 1 0.95; } to { opacity: 1; scale: 1 1; } }
  @keyframes vertical-out { from { opacity: 1; scale: 1 1; } to { opacity: 0; scale: 1 0.95; } }
  @keyframes horizontal-in { from { opacity: 0; scale: 0.95 1; } to { opacity: 1; scale: 1 1; } }
  @keyframes horizontal-out { from { opacity: 1; scale: 1 1; } to { opacity: 0; scale: 0.95 1; } }
`;

function Scale(props, ref) {
  const orientation = React.useMemo(
    () =>
      props.placement && (props.placement.startsWith('left') || props.placement.startsWith('right'))
        ? 'horizontal'
        : 'vertical',
    [props.placement],
  );

  return sstyled(style)(
    <Animation
      ref={ref}
      {...props}
      keyframes={[style[`@${orientation}-in`], style[`@${orientation}-out`]]}
    />,
  );
}

Scale.displayName = 'Scale';

export default createBaseComponent(Scale);
