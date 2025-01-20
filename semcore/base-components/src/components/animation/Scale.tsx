import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';
import { useForkRef } from '@semcore/core/lib/utils/ref';

function Scale(props: any, ref: React.Ref<HTMLElement>) {
  const [placement, setPlacement] = React.useState(props.placement);
  const keyframesKey = React.useMemo(() => {
    if (placement.startsWith('left')) return 'scale-left';
    if (placement.startsWith('right')) return 'scale-right';
    if (placement.startsWith('bottom')) return 'scale-bottom';
    if (placement.startsWith('top')) return 'scale-top';

    return 'opacity';
  }, [placement]);

  const popperCheckRef = React.useRef<HTMLElement>();
  const forkedRef = useForkRef(ref, popperCheckRef);

  React.useEffect(() => {
    if (placement && placement !== 'auto') return;
    if (!popperCheckRef.current) return;
    const timeout = setTimeout(() => {
      if (!popperCheckRef.current) return;
      const placement = popperCheckRef.current.dataset.popperPlacement;
      if (placement) setPlacement(placement);
    }, 0);
    return () => clearTimeout(timeout);
  }, [props.visible]);

  return sstyled(style)(
    <Animation
      ref={forkedRef}
      {...props}
      keyframes={[style[`@${keyframesKey}-in`], style[`@${keyframesKey}-out`]]}
    />,
  );
}

Scale.displayName = 'Scale';

export default createBaseComponent(Scale);
