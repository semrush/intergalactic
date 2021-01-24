/* eslint-disable */
import React from 'react';

export default function isNode(node?) {
  switch (typeof node) {
    case 'number':
      return Number.isFinite(node);
    case 'string':
      return Boolean(node);
    case 'undefined':
      return false;
    case 'boolean':
      return node;
    case 'object':
      if (Array.isArray(node)) return node.some(isNode);
      if (node === null) return false;
      return React.isValidElement(node);
    default:
      return false;
  }
}
