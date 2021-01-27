import React from 'react';
// @ts-ignore
import { CHILDREN_COMPONENT, INHERITED_NAME } from '@semcore/core';
import getOriginChildren from './getOriginChildren';

function addonTextChildren(
  Children: any,
  Text: React.ComponentType,
  Addon: React.ComponentType | React.ComponentType[],
) {
  const children = getOriginChildren(Children);
  if (typeof children === 'function') {
    return <Children />;
  }
  return React.Children.toArray(children).some((element) => {
    if (!React.isValidElement(element)) return false;
    if (element.type === React.Fragment) return true;
    if (element.type[CHILDREN_COMPONENT]) {
      const wrapChildren = addonTextChildren(element.type, Text, Addon);
      if (wrapChildren.type[CHILDREN_COMPONENT]) {
        return true;
      } else {
        element = wrapChildren;
      }
    }
    // @ts-ignore
    const inheritedNames = element.type[INHERITED_NAME] || [element.type.displayName];
    const addonNames = Array.isArray(Addon)
      ? Addon.map((Component) => Component.displayName)
      : [Addon.displayName];
    return [Text.displayName, ...addonNames].find((name) => inheritedNames.includes(name));
  }) ? (
    <Children />
  ) : (
    <Text>
      <Children />
    </Text>
  );
}

export default addonTextChildren;
