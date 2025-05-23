import React from 'react';

function reactToText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
    if (Number.isNaN(node)) return '';
    return node.toString();
  }
  if (!node) {
    return '';
  }
  if (Array.isArray(node)) {
    return node.map((entry) => reactToText(entry)).join('');
  }

  const props: { children?: React.ReactNode } = (node as any).props ? (node as any).props : {};

  if (!props || !props.children) {
    const typeOrigin = (node as any).type?.origin;
    if (typeof typeOrigin === 'string') {
      return typeOrigin;
    }

    return '';
  }

  return reactToText(props.children);
}

export default reactToText;
