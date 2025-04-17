import { getOffsetParent } from '../utils/getOffsetParent';
import { Modifier } from '@popperjs/core';

const clamp = (value: number, boundary1: number, boundary2: number) => {
  const min = Math.min(boundary1, boundary2);
  const max = Math.max(boundary1, boundary2);
  return Math.min(Math.max(value, min), max);
};

type Options = {
  cursorAnchoring: true;
  mouseEnterCursorPositionRef: { current: { x: number; y: number } };
};

const getWindowRect = () => ({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight });

export const cursorAnchoringModifier: Modifier<'cursorAnchoring', Options> = {
  name: 'cursorAnchoring',
  phase: 'beforeRead',
  enabled: true,
  fn: ({ state, options }) => {
    const { placement } = state.options;

    const verticalPlacement =
      !placement || placement.startsWith('top') || placement.startsWith('bottom');

    const { cursorAnchoring, mouseEnterCursorPositionRef } = options;
    const { rects, elements } = state;
    if (!cursorAnchoring) return;
    if (verticalPlacement) {
      const offsetParent = getOffsetParent(elements.popper);
      const offsetParentRect =
        offsetParent === window ? getWindowRect() : offsetParent.getBoundingClientRect();
      const mouseX = mouseEnterCursorPositionRef?.current?.x;
      if (mouseX === undefined) return;
      const width = Math.min(rects.reference.width, rects.popper.width);
      const x = clamp(
        mouseX - offsetParentRect.x - width / 2,
        rects.reference.x,
        rects.reference.x + rects.reference.width - width,
      );
      rects.reference.x = x;
      rects.reference.width = width;
    } else {
      const offsetParent = getOffsetParent(elements.popper);
      const offsetParentRect =
        offsetParent === window ? getWindowRect() : offsetParent.getBoundingClientRect();
      const mouseY = mouseEnterCursorPositionRef?.current?.y;
      if (mouseY === undefined) return;
      const height = Math.min(rects.reference.height, rects.popper.height);
      const y = clamp(
        mouseY - offsetParentRect.y - height / 2,
        rects.reference.y,
        rects.reference.y + rects.reference.height - height,
      );
      rects.reference.y = y;
      rects.reference.height = height;
    }
  },
};
