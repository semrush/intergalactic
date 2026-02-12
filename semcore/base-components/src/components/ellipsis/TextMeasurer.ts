/**
 * Util class for measure text size in different elements
 */
class TextMeasurer {
  private canvas = document.createElement('canvas');
  private ctx = this.canvas.getContext('2d')!;

  private canvasTnum = document.createElement('canvas');
  private ctxTnum = this.canvasTnum.getContext('2d')!;

  constructor() {
    this.canvasTnum.style.setProperty('font-variant-numeric', 'tabular-nums');
    this.canvasTnum.style.setProperty('display', 'none');
    document.body.appendChild(this.canvasTnum);
  }

  public measure(text: string, font: string, isTnum: boolean): number {
    const ctx = isTnum ? this.ctxTnum : this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = font;

    const textData = ctx.measureText(text);
    return Math.ceil(textData.width);
  }

  public createMeasurerElement(element: HTMLElement) {
    const styleElement = window.getComputedStyle(element, null);
    const temporaryElement = document.createElement('temporary-block');
    temporaryElement.style.display = styleElement.getPropertyValue('display');
    temporaryElement.style.padding = styleElement.getPropertyValue('padding');
    temporaryElement.style.position = 'absolute';
    temporaryElement.style.right = '0%';
    temporaryElement.style.bottom = '0%';
    temporaryElement.style.visibility = 'hidden';
    temporaryElement.style.whiteSpace = styleElement.getPropertyValue('white-space');
    temporaryElement.style.wordWrap = styleElement.getPropertyValue('word-wrap');

    this.setFontSettings(temporaryElement, styleElement);

    return temporaryElement;
  }

  private setFontSettings = (element: HTMLElement, styleElement: CSSStyleDeclaration): void => {
    element.style.fontFamily = styleElement.getPropertyValue('font-family');
    element.style.fontSize = styleElement.getPropertyValue('font-size');
    element.style.fontWeight = styleElement.getPropertyValue('font-weight');
    element.style.lineHeight = styleElement.getPropertyValue('line-height');
    element.style.fontFeatureSettings =
      styleElement.getPropertyValue('font-feature-settings');
    element.style.fontVariantNumeric = styleElement.getPropertyValue('font-variant-numeric');
  };
}

export const textMeasurer = new TextMeasurer();
