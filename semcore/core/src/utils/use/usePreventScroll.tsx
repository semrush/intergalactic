import React from 'react';

import canUseDOM from '../canUseDOM';
import { useUID } from '../uniqueID';

export function getScrollbarWidth(): number {
  if (!canUseDOM()) return 0;
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  // @ts-expect-error
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  outer.parentNode?.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

function getIntValueFromCss(value: any) {
  return !Number.isNaN(Number(value)) ? Number(value) : Number.parseInt(value, 10);
}

const isScrollBarGutterSupported = () => CSS.supports('scrollbar-gutter', 'stable');

const isHTMLScrollable = () => document.documentElement.scrollHeight > document.documentElement.clientHeight;

function setStyleIfDefined<E extends HTMLElement, P extends keyof CSSStyleDeclaration>(el: E, prop: P, value: CSSStyleDeclaration[P] | undefined) {
  if (value === undefined) return;

  el.style[prop] = value;
}

const scrollPreventers = new Map<string, {
  bodyOverflow?: string;
  bodyPaddingRight?: string;
  bodyBoxSizing?: string;
  htmlScrollBarGutter?: string;
  htmlBgColor?: string;
}>();
const overflowValuesToSkip = ['clip', 'hidden'];

export default function usePreventScroll(forElement: React.RefObject<HTMLElement>, visible = true, disabled = false) {
  const scrollbarWidth = React.useMemo(getScrollbarWidth, [getScrollbarWidth]);
  const id = useUID('scroll-preventer-');

  React.useEffect(() => {
    if (disabled) return;
    if (!canUseDOM() || !visible) return;

    scrollPreventers.set(id, {});

    if (scrollPreventers.size > 1) return;

    const {
      overflow: computedBodyOverflow,
      paddingRight: computedBodyPaddingRight,
      boxSizing: computedBodyBoxSizing,
    } = window.getComputedStyle(document.body);

    if (overflowValuesToSkip.includes(computedBodyOverflow)) return;

    const {
      backgroundColor: computedHTMLBgColor,
      scrollbarGutter: computedHTMLScrollBarGutter,
    } = window.getComputedStyle(document.documentElement);

    const {
      overflow: styleBodyOverflow,
      paddingRight: styleBodyPaddingRight,
      boxSizing: styleBodyBoxSizing,
    } = document.body.style;

    const {
      scrollbarGutter: styleHTMLScrollBarGutter,
      backgroundColor: styleHTMLBgColor,
    } = document.documentElement.style;

    if (isScrollBarGutterSupported() && isHTMLScrollable()) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.scrollbarGutter = 'stable';

      if (forElement.current) {
        const { backgroundColor } = window.getComputedStyle(forElement.current);
        document.documentElement.style.backgroundColor = backgroundColor;
      }

      scrollPreventers.set(id, {
        bodyOverflow: styleBodyOverflow === '' ? styleBodyOverflow : computedBodyOverflow,
        htmlScrollBarGutter: styleHTMLScrollBarGutter === '' ? styleHTMLScrollBarGutter : computedHTMLScrollBarGutter,
        htmlBgColor: styleHTMLBgColor === '' ? styleHTMLBgColor : computedHTMLBgColor,
      });

      return;
    }

    const intPaddingRight = getIntValueFromCss(computedBodyPaddingRight);
    let intPaddingRightFromStyle = getIntValueFromCss(styleBodyPaddingRight);
    // Detected own style for window inside window
    if (intPaddingRightFromStyle !== scrollbarWidth) {
      intPaddingRightFromStyle = 0;
    }

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight =
      scrollbarWidth + (intPaddingRight - intPaddingRightFromStyle) + 'px';
    document.body.style.boxSizing = 'border-box';

    scrollPreventers.set(id, {
      bodyOverflow: styleBodyOverflow === '' ? styleBodyOverflow : computedBodyOverflow,
      bodyPaddingRight: styleBodyPaddingRight === '' ? styleBodyPaddingRight : computedBodyPaddingRight,
      bodyBoxSizing: styleBodyBoxSizing === '' ? styleBodyBoxSizing : computedBodyBoxSizing,
    });
  }, [visible, id, disabled]);

  React.useEffect(() => {
    if (disabled) return;
    if (!canUseDOM() || !visible) return;
    return () => {
      const prevValues = scrollPreventers.get(id);

      scrollPreventers.delete(id);

      if (scrollPreventers.size !== 0) return;

      if (!prevValues) return;

      const { bodyOverflow, bodyPaddingRight, bodyBoxSizing, htmlBgColor, htmlScrollBarGutter } = prevValues;

      setStyleIfDefined(document.body, 'overflow', bodyOverflow);
      setStyleIfDefined(document.body, 'paddingRight', bodyPaddingRight);
      setStyleIfDefined(document.body, 'boxSizing', bodyBoxSizing);
      setStyleIfDefined(document.documentElement, 'scrollbarGutter', htmlScrollBarGutter);
      setStyleIfDefined(document.documentElement, 'backgroundColor', htmlBgColor);
    };
  }, [visible, id, disabled]);
}
