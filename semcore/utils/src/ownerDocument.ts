export default function ownerDocument(node?: Node) {
  return node?.ownerDocument || document;
}
