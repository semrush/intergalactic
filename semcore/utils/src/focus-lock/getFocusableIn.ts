import { isFocusable } from './isFocusable';

export const getFocusableIn = (node: HTMLElement) => {
  const treeWalker = node?.ownerDocument?.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, (node) =>
    'ownerSVGElement' in node && node.ownerSVGElement
      ? NodeFilter.FILTER_REJECT
      : NodeFilter.FILTER_ACCEPT,
  );

  const result: HTMLElement[] = [];

  if (!treeWalker) return result;
  if (isFocusable(treeWalker.currentNode)) {
    result.push(treeWalker.currentNode as HTMLElement);
  }
  while (treeWalker.nextNode() !== null) {
    if (isFocusable(treeWalker.currentNode)) {
      result.push(treeWalker.currentNode as HTMLElement);
    }
  }

  return result;
};
