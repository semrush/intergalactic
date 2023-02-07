import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';

const style = sstyled.css`
  @keyframes top-in { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes top-out { from { opacity: 1; transform: translateY(0); } to {  opacity: 0; transform: translateY(-20px); } }
  @keyframes bottom-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes bottom-out { from { opacity: 1; transform: translateY(0); } to {  opacity: 0; transform: translateY(20px); } }
  @keyframes left-in { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes left-out { from { opacity: 1; transform: translateX(0); } to {  opacity: 0; transform: translateX(-20px); } }
  @keyframes right-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes right-out { from { opacity: 1; transform: translateX(0); } to {  opacity: 0; transform: translateX(20px); } }
`;

function Slide(props, ref) {
  return sstyled(style)(
    <Animation
      ref={ref}
      {...props}
      keyframes={[style[`@${props.slideOrigin}-in`], style[`@${props.slideOrigin}-out`]]}
    />,
  );
}

Slide.displayName = 'Slide';

export default createBaseComponent(Slide);
