export function removeUndefinedKeys<T extends {}>(obj: T) {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export function getSize(size: string | number | undefined): string | undefined {
  if (typeof size !== 'number') {
    return size;
  }
  if (size < 1) {
    return `${100 * size}%`;
  }
  if (size >= 1) {
    return `${size}px`;
  }
}

export function getAutoOrScaleIndent(indent: number | string | undefined, scaleIndent: number) {
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
}
