import React from 'react';
import { CHILDREN_COMPONENT, INHERITED_NAME } from '../core-types/symbols';
import getOriginChildren from './getOriginChildren';
import isNode from './isNode';

function addonTextChildren(
  Children: any,
  Text: React.ComponentType<any>,
  Addon: React.ComponentType | React.ComponentType[],
  isTextWrapIfEmptyChildren = false,
) {
  const children = getOriginChildren(Children);
  if (typeof children === 'function') {
    return <Children />;
  }

  if (!isTextWrapIfEmptyChildren && !isNode(children)) {
    return null;
  }
  return React.Children.toArray(children).some((element: any) => {
    if (!React.isValidElement(element)) return false;
    if (element.type === React.Fragment) return true;
    if ((element.type as any)[CHILDREN_COMPONENT]) {
      const wrapChildren: any = addonTextChildren(element.type, Text, Addon);
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
