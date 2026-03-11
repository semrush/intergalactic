import type { MiddlewareState } from '@floating-ui/dom';

type MouseEnterCursorPosition = {
  x: number;
};

export class Middleware {
  public static verticalCursorAnchoring(mouseCursorPosition: MouseEnterCursorPosition) {
    return {
      name: 'verticalCursorAnchoring',
      fn(state: MiddlewareState) {
        const { rects, x, elements } = state;
        const referenceLeft = elements.reference.getBoundingClientRect().left;

        return {
          x: rects.floating.width > rects.reference.width ? x : mouseCursorPosition.x - referenceLeft + x - rects.floating.width / 2,
        };
      },
    };
  }
}
