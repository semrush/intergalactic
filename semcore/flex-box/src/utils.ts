export const getAutoOrScaleIndent = (indent: number | string, scaleIndent: number) => {
  if (typeof indent === 'string') {
    return indent;
  }
  if (typeof indent === 'number' && indent > -1 && indent < 1) {
    return `${100 * indent}%`;
  }
  if (typeof indent === 'number' && (indent >= 1 || indent <= -1)) {
    return `${indent * scaleIndent}px`;
  }
  return indent;
};
