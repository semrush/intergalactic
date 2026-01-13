import type { MiddlewareState } from '@floating-ui/dom';

type MouseEnterCursorPosition = {
  x: number;
  y: number;
};

export class Middleware {
  public static cursorAnchoring(mouseCursorPosition: MouseEnterCursorPosition) {
    return {
      name: 'cursorAnchoring',
      fn(state: MiddlewareState) {
        const { placement, rects, x, y } = state;
        const verticalPlacement =
          !placement || placement.startsWith('top') || placement.startsWith('bottom');

        if (verticalPlacement) {
          return {
            x: rects.floating.width > rects.reference.width ? x : mouseCursorPosition.x - rects.floating.width / 2,
          };
        } else {
          return {
            y: rects.floating.height > rects.reference.height ? y : mouseCursorPosition.y - rects.floating.height / 2,
          };
        }
      },
    };
  }
}
