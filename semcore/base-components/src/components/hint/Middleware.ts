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
        const { placement, rects } = state;
        const verticalPlacement =
          !placement || placement.startsWith('top') || placement.startsWith('bottom');

        if (verticalPlacement) {
          return {
            x: mouseCursorPosition.x - rects.floating.width / 2,
          };
        } else {
          return {
            y: mouseCursorPosition.y - rects.floating.height / 2,
          };
        }
      },
    };
  }
}
