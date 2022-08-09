import React, { useCallback, useState } from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';

const style = sstyled.css`
  @keyframes enter {
    from {
      overflow: hidden;
      height: 0;
    }
    to {
      height: var(--height);
    }
  }

  @keyframes exit {
    from {
      height: var(--height);
    }
    to {
      height: 0;
    }
  }
`;

function Collapse({ onAnimationStart, onAnimationEnd, visible, ...props }, ref) {
  const SCollapse = Animation;
  const [height, setHeightVar] = useState('auto');

  const [wasCollapsed, setWasCollapsed] = React.useState(!visible);
  React.useEffect(() => {
    if (!visible) setWasCollapsed(!visible);
  }, [visible]);
  const keyframes = React.useMemo(
    () => (wasCollapsed ? [style['@enter'], style['@exit']] : [undefined, style['@exit']]),
    [wasCollapsed, style],
  );

  const handlerAnimationStart = useCallback((e) => {
    if (e.currentTarget !== e.target) return;
    if (onAnimationStart) onAnimationStart(e);
    e.currentTarget.style.overflow = 'hidden';
    setHeightVar(e.currentTarget.scrollHeight + 'px');
  }, []);

  const handlerAnimationEnd = useCallback((e) => {
    if (e.currentTarget !== e.target) return;
    if (onAnimationEnd) onAnimationEnd(e);
    e.currentTarget.style.overflow = 'initial';
    setHeightVar('auto');
  }, []);

  return sstyled(style)(
    <SCollapse
      ref={ref}
      {...props}
      visible={visible}
      onAnimationStart={handlerAnimationStart}
      onAnimationEnd={handlerAnimationEnd}
      height={height}
      keyframes={keyframes}
    />,
  );
}

Collapse.displayName = 'Collapse';

export default createBaseComponent(Collapse);
