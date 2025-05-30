import { AFTER_BORDER_ID, BEFORE_BORDER_ID } from './focusBorders';

const focusable = [
  ['BUTTON'],
  ['SELECT'],
  ['TEXTAREA'],
  ['INPUT'],
  ['A', { has: 'href' }],
  ['AREA', { has: 'href' }],
  ['SUMMARY'],
  ['IFRAME'],
  ['OBJECT'],
  ['EMBED'],
  ['AUDIO', { has: 'controls' }],
  ['VIDEO', { has: 'controls' }],
  [{ has: 'tabindex' }],
  [{ has: 'contenteditable' }],
  [{ has: 'autofocus' }],
];

export const isFocusable = (node: Node) => {
  if (!node) return false;
  if (!node.ownerDocument) return false;
  if (!node.ownerDocument.defaultView?.HTMLElement) return false;
  if (
    !(
      node instanceof node.ownerDocument.defaultView.HTMLElement ||
      node instanceof node.ownerDocument.defaultView.SVGElement
    )
  )
    return false;
  if (node.hasAttribute('disabled')) return false;
  if (node.getAttribute('tabindex') === '-1') return false;
  if (node.getAttribute('hidden') !== null) return false;
  if (
    node.getAttribute('data-id') === BEFORE_BORDER_ID ||
    node.getAttribute('data-id') === AFTER_BORDER_ID
  )
    return false;
  const tagName = node.tagName;
  for (const params of focusable) {
    if (
      params.every((param) => {
        if (typeof param === 'string' && param === tagName) return true;
        if (typeof param === 'object' && param.has && node.hasAttribute(param.has)) return true;
        return false;
      })
    ) {
      const style = getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden') return false;

      return true;
    }
  }
  return false;
};
