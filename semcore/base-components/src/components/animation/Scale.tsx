import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import { useForkRef } from '@semcore/core/lib/utils/ref';
import React from 'react';

import Animation from './Animation';
import type { NSAnimation } from './Animation.types';
import style from './style/keyframes.shadow.css';

function Scale(props: Intergalactic.InternalTypings.InferComponentProps<NSAnimation.Scale.Component>, ref: React.Ref<HTMLDivElement>) {
  const [placement, setPlacement] = React.useState(props.placement ?? '');
  const keyframesKey = React.useMemo(() => {
    if (placement.startsWith('left')) return 'scale-left';
    if (placement.startsWith('right')) return 'scale-right';
    if (placement.startsWith('bottom')) return 'scale-bottom';
    if (placement.startsWith('top')) return 'scale-top';

    return 'opacity';
  }, [placement]);

  const popperCheckRef = React.useRef<HTMLDivElement>(null);
  const forkedRef = useForkRef<HTMLDivElement>(ref, popperCheckRef);

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
      // `ref` is overriden by spread props.
      // @ts-ignore
      ref={forkedRef}
      {...props}
      keyframes={[style[`@${keyframesKey}-in`], style[`@${keyframesKey}-out`]]}
    />,
  );
}

Scale.displayName = 'Scale';

export default createBaseComponent<NSAnimation.Scale.Component>(Scale);
