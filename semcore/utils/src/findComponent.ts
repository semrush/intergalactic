import React from 'react';
// @ts-ignore
import { CHILDREN_COMPONENT, INHERITED_NAME } from '@semcore/core';
import getOriginChildren from './getOriginChildren';

function findComponent(Children, names) {
  const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
  return React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        return findComponent(child.props.children, names);
      }
      // @ts-ignore
      const inheritedNames = child.type[INHERITED_NAME] || [child.type.displayName];
      return !!inheritedNames.find((name) => names.includes(name));
    }
  });
}

export function isAdvanceMode(Children, name) {
  const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
  if (!children) return false;
  if (typeof children === 'function') {
    return true;
  }
  return !!findComponent(children, name);
}
export default findComponent;
