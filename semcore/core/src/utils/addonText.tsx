import React from 'react';

export default function addonText(
  children: React.ReactNode,
  Text: React.ComponentType<any>,
  Addon: React.ComponentType,
  isTextWrapIfEmptyChildren = false,
) {
  if (!isTextWrapIfEmptyChildren && !children) {
    return false;
  }
  return React.Children.toArray(children).some(
    (element) =>
      React.isValidElement(element) &&
      (element.type === React.Fragment ||
        (element.type as any)['displayName'] === Text.displayName ||
        (element.type as any)['displayName'] === Addon.displayName),
  ) ? (
    children
  ) : (
    <Text>{children}</Text>
  );
}
