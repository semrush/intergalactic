import React, { useCallback, useState } from 'react';
import { createBaseComponent, styled } from '@semcore/core';
import Animation, { IAnimationProps } from './Animation';

export interface ICollapseProps extends IAnimationProps {}

function Collapse({ onAnimationStart, onAnimationEnd, ...props }, ref) {
  const SCollapse = Animation;
  const [heightVar, setHeightVar] = useState('auto');

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

  return styled()`
    @keyframes enter {
      from {
        overflow: hidden;
        height: 0;
      }
      to {
        height: ${heightVar};
      }
    }

    @keyframes exit {
      from {
        height: ${heightVar};
      }
      to {
        height: 0;
      }
    }
  `(
    <SCollapse
      ref={ref}
      {...props}
      onAnimationStart={handlerAnimationStart}
      onAnimationEnd={handlerAnimationEnd}
      keyframes={[styled.styles.enter, styled.styles.exit]}
    />,
  );
}

Collapse.displayName = 'Collapse';

export default createBaseComponent<ICollapseProps>(Collapse);
