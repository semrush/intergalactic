import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';

const style = sstyled.css`
  @keyframes left-in { from { opacity: 0; transform: translateX(40%) scaleX(0.6); } to { opacity: 1; transform: translateX(0px) scaleX(1); } }
  @keyframes right-in { from { opacity: 0; transform: translateX(-40%) scaleX(0.6); } to { opacity: 1; transform: translateX(0px) scaleX(1); } }
  @keyframes top-in { from { opacity: 0; transform: translateY(40%) scaleY(0.6); } to { opacity: 1; transform: translateY(0px) scaleY(1); } }
  @keyframes bottom-in { from { opacity: 0; transform: translateY(-40%) scaleY(0.6); } to { opacity: 1; transform: translateY(0px) scaleY(1); } }
  @keyframes left-out { to { opacity: 0; transform: translateX(40%) scaleX(0.6); } from { opacity: 1; transform: translateX(0px) scaleX(1); } }
  @keyframes right-out { to { opacity: 0; transform: translateX(-40%) scaleX(0.6); } from { opacity: 1; transform: translateX(0px) scaleX(1); } }
  @keyframes top-out { to { opacity: 0; transform: translateY(40%) scaleY(0.6); } from { opacity: 1; transform: translateY(0px) scaleY(1); } }
  @keyframes bottom-out { to { opacity: 0; transform: translateY(-40%) scaleY(0.6); } from { opacity: 1; transform: translateY(0px) scaleY(1); } }
`;

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
      keyframes={[style[`@${keyframesKey}-in`], style[`@${keyframesKey}-out`]]}
    />,
  );
}

Scale.displayName = 'Scale';

export default createBaseComponent(Scale);
