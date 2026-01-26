import type { MiddlewareState } from '@floating-ui/dom';

type MouseEnterCursorPosition = {
  x: number;
};

export class Middleware {
  public static verticalCursorAnchoring(mouseCursorPosition: MouseEnterCursorPosition) {
    return {
      name: 'verticalCursorAnchoring',
      fn(state: MiddlewareState) {
        const { rects, x } = state;
        return {
          x: rects.floating.width > rects.reference.width ? x : mouseCursorPosition.x - rects.floating.width / 2,
        };
      },
    };
  }
}
