export class ElementRect implements DOMRect {
  get bottom(): number {
    return this.x + this.height;
  };

  get left(): number {
    return this.x;
  };

  get right(): number {
    return this.x + this.width;
  };

  get top(): number {
    return this.y;
  };

  height: number = 0;
  width: number = 0;
  x: number = 0;
  y: number = 0;

  constructor(element?: HTMLElement | SVGElement) {
    if (element) {
      this.setFromElement(element);
    }
  }

  public setFromElement(element: HTMLElement | SVGElement) {
    const { x, y, width, height } = element.getBoundingClientRect();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public get value() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
    };
  }

  toJSON(): string {
    return JSON.stringify(this.value);
  };
}
