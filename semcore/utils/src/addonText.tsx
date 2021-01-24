import React from 'react';

export default function addonText(
  children: React.ReactNode,
  Text: React.ComponentType,
  Addon: React.ComponentType,
) {
  return React.Children.toArray(children).some(
    (element) =>
      React.isValidElement(element) &&
      (element.type === React.Fragment ||
        element.type['displayName'] === Text.displayName ||
        element.type['displayName'] === Addon.displayName),
  ) ? (
    children
  ) : (
    <Text>{children}</Text>
  );
}
