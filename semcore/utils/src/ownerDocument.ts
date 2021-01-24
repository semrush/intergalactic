/* eslint-disable */
export default function ownerDocument(node?: Node) {
  return (node && node.ownerDocument) || document;
}
