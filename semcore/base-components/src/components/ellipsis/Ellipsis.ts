import EventEmitter from '@semcore/core/lib/utils/eventEmitter';
import type { CSSProperties } from 'react';

import { ellipsisManager } from './EllipsisManager';
import { Scheduler } from './Scheduler';
import { textMeasurer } from './TextMeasurer';

type CommonEllipsisSettings = {
  /**
   * Common container element for few ellipsises for improve performance.
   */
  containerElement?: HTMLElement;

  /**
   * Function for crop or increase a container width. For example, for tables with accordion
   */
  recalculateContainerWidth?: (width: number) => number;

  /**
   * Flag to enable observing changes in cropped texts.
   * @default false
   */
  observeChildrenMutations?: boolean;
};

type MiddleCroppedEllipsisSettings = {
  /**
   * Crop position
   * @default end
   */
  cropPosition: 'middle';

  maxLine?: never;

  /**
   * Count of last symbols which shouldn't be cropped.
   */
  lastRequiredSymbols?: number;
};

type EndCroppedEllipsisSettings = {
  /**
   * Crop position
   * @default end
   */
  cropPosition?: 'end';
  /**
   * Lines count in multiline Ellipsis.
   * Applies only for `trim = end`
   * @default 1
   */
  maxLine?: number;
};

export type EllipsisSettings = Readonly<(EndCroppedEllipsisSettings | MiddleCroppedEllipsisSettings) & CommonEllipsisSettings>;

type PartialRequired<T, K extends keyof T> = Omit<T, K> & {
  [key in K]-?: T[key];
};

type Events = {
  isEllipsized: (isEllipsized: boolean) => void;
};

type TruncateOptions = {
  text?: string;
  containerWidth?: number;
  font?: string;
  direction?: 'start' | 'end';
};

export class Ellipsis extends EventEmitter<Events> {
  public readonly element: HTMLElement;
  public readonly containerElement: HTMLElement | undefined;
  public textContent: string;

  private readonly settings: PartialRequired<EllipsisSettings, 'cropPosition' | 'maxLine'>;

  public readonly scheduler = new Scheduler();

  private _isEllipsized: boolean = false;
  private calculatedFont = '';

  private requiredFrom = -1;
  private requiredTo = -1;
  private stylesForRequired: CSSProperties | string | null = null;

  constructor(element: HTMLElement, props: EllipsisSettings) {
    super();

    this.containerElement = props.containerElement;
    this.element = element;
    this.textContent = element.textContent ?? '';
    this.settings = {
      cropPosition: props.cropPosition ?? 'end',
      maxLine: props.maxLine ?? 1,
      recalculateContainerWidth: props.recalculateContainerWidth,
    };

    if ('lastRequiredSymbols' in props && props.lastRequiredSymbols !== undefined) {
      this.requiredTo = this.textContent.length;
      this.requiredFrom = this.requiredTo - props.lastRequiredSymbols;
    }

    this.handleChanges = this.handleChanges.bind(this);

    if (props.cropPosition === 'middle' && this.isElementInViewport()) {
      ellipsisManager.addEllipsis(this);
    } else {
      this.scheduler.schedule(() => ellipsisManager.addEllipsis(this));
    }
  }

  set isEllipsized(isEllipsized: boolean) {
    this._isEllipsized = isEllipsized;
    this.emit('isEllipsized', isEllipsized);
  }

  get isEllipsized(): boolean {
    return this._isEllipsized;
  }

  get cropPosition() {
    return this.settings.cropPosition;
  }

  get maxLine() {
    return this.settings.maxLine;
  }

  get observeChildrenMutations() {
    return this.settings.observeChildrenMutations;
  }

  public getTruncateSize(options?: TruncateOptions): [number, number] {
    const text = options?.text ?? this.textContent;
    const containerWidth = options?.containerWidth ?? this.getContainerWidth();
    const font = options?.font ?? this.getFont();

    let keep = 0;
    let left = 0;
    let right = text.length;
    let size = 0;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      keep = Math.max(0, Math.ceil(mid / 2));
      let testText: string;
      if (options?.direction === undefined) {
        testText = text.slice(0, keep) + '...' + text.slice(-keep);
      } else {
        testText = options.direction === 'start' ? text.slice(0, keep) : text.slice(-keep);
      }
      const testWidth = textMeasurer.measure(testText, font);

      if (testWidth < containerWidth) {
        size = keep;
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === 0) {
      return [0, 0];
    }

    return [size, size];
  }

  public cleanUp(): void {
    ellipsisManager.removeEllipsis(this);
    this.scheduler.cancel();
    this.isEllipsized = false;
    this.element.textContent = this.textContent;
  }

  public setRequiredIndexes(indexes: [number, number], styles?: CSSProperties | string): void {
    const [from, to] = indexes;

    this.requiredFrom = from;
    this.requiredTo = to;

    if (styles) {
      this.stylesForRequired = styles;
    }

    this.handleChanges();
  }

  public handleChanges() {
    this.element.textContent = this.textContent;

    this.isEllipsized = this.isTextOverflowing();

    if (this.isEllipsized && this.settings.cropPosition === 'middle') {
      this.element.setAttribute('aria-label', this.textContent);
      if (this.requiredFrom === -1 && this.requiredTo === -1) {
        const [from, to] = this.getTruncateSize();

        this.element.textContent = this.textContent.slice(0, from) + '...' + this.textContent.slice(-1 * to);
      } else {
        this.handleRequiredPath(this.requiredFrom, this.requiredTo);
      }
    }
  }

  private isTextOverflowing(): boolean {
    let isOverflowing = false;

    if (this.settings.maxLine > 1) {
      const measuringElement = textMeasurer.createMeasurerElement(this.element);
      measuringElement.textContent = this.textContent;

      const { height: currentHeight, width: currentWidth } = this.element.getBoundingClientRect();

      document.body.appendChild(measuringElement);

      measuringElement.style.width = `${currentWidth}px`;

      const width = measuringElement.scrollWidth;
      const height = measuringElement.getBoundingClientRect().height;

      if (Math.ceil(currentHeight) < height || Math.ceil(currentWidth) < width) {
        isOverflowing = true;
      }

      document.body.removeChild(measuringElement);
    } else {
      isOverflowing = textMeasurer.measure(this.textContent, this.getFont()) > this.getContainerWidth();
    }

    return isOverflowing;
  }

  private handleRequiredPath(from: number, to: number) {
    const requiredText = `...${this.textContent.slice(from, to)}${this.textContent.length === to ? '' : '...'}`;
    const requiredWidth = textMeasurer.measure(requiredText, this.getFont());
    const startText = this.textContent.slice(0, from);
    const endText = this.textContent.slice(to);
    const containerWidth = this.textContent.length === to
      ? (this.getContainerWidth() - requiredWidth)
      : (this.getContainerWidth() - requiredWidth) / 2;

    const [sizeStart] = this.getTruncateSize({
      text: startText,
      containerWidth,
      direction: 'start',
    });
    const [sizeEnd] = this.getTruncateSize({
      text: endText,
      containerWidth,
      direction: 'end',
    });

    const start = startText.slice(0, sizeStart);
    const end = endText.slice(-1 * sizeEnd);

    if (this.stylesForRequired === null) {
      this.element.textContent = `${start}${requiredText}${end}`;
    } else {
      this.highlightRequiredPath(start, end, requiredText, this.stylesForRequired);
    }
  }

  private highlightRequiredPath(start: string, end: string, requiredText: string, stylesForRequired: string | CSSProperties): void {
    const startElement = document.createElement('span');
    startElement.textContent = `${start}...`;
    const endElement = document.createElement('span');
    endElement.textContent = `...${end}`;

    const requiredElement = document.createElement('span');
    requiredElement.textContent = `${requiredText.slice(3, -3)}`;

    if (typeof stylesForRequired === 'string') {
      requiredElement.classList.add(stylesForRequired);
    } else {
      for (const key in stylesForRequired) {
        const style = stylesForRequired[key as keyof CSSProperties];

        if (typeof style === 'string' || typeof style === 'number') {
          const propertyName = key.replaceAll(/[A-Z]/g, (g) => `-${g[0].toLocaleLowerCase()}`);
          requiredElement.style.setProperty(propertyName, style.toString());
        }
      }
    }

    this.element.innerHTML = '';
    this.element.append(startElement, requiredElement, endElement);
  }

  private isElementInViewport(): boolean {
    const rect = this.element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  private getFont() {
    if (!this.calculatedFont) {
      const styleElement = window.getComputedStyle(this.element);
      this.calculatedFont = `${styleElement.fontWeight} ${styleElement.fontSize} ${styleElement.fontFamily}`;
    }

    return this.calculatedFont;
  }

  private getContainerWidth() {
    const containerElement = this.containerElement;

    if (containerElement) {
      const computedStyle = window.getComputedStyle(containerElement);
      const boxSizing = computedStyle?.boxSizing;
      let containerWidth: number;

      if (boxSizing === 'border-box') {
        const paddingLeft = computedStyle?.paddingLeft.replace('px', '') ?? '0';
        const paddingRight = computedStyle?.paddingRight.replace('px', '') ?? '0';

        containerWidth = containerElement.clientWidth - Number(paddingLeft) - Number(paddingRight);
      } else {
        containerWidth = containerElement.clientWidth;
      }

      if (this.settings.recalculateContainerWidth !== undefined) {
        return this.settings.recalculateContainerWidth(containerWidth);
      } else {
        return containerWidth;
      }
    }

    return this.element.clientWidth;
  }
}
