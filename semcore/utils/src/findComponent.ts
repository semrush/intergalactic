import React, { ReactElement, ReactNode } from 'react';
// @ts-ignore
import { CHILDREN_COMPONENT, INHERITED_NAME } from '@semcore/core';
import getOriginChildren from './getOriginChildren';

function findComponent(
  Children: any,
  names: string[],
): Exclude<ReactNode, boolean | null | undefined> | undefined {
  const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
  return React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        return findComponent(child.props.children, names);
      }
      // @ts-ignore
      const inheritedNames = child.type[INHERITED_NAME] || [child.type.displayName];
      return !!inheritedNames.find((name: string) => names.includes(name));
    }
  });
}

export function isAdvanceMode(Children: any, name: string[]) {
  const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
  if (!children) return false;
  if (typeof children === 'function') {
    return true;
  }
  return !!findComponent(children, name);
}

export function findAllComponents(Children: any, names: string[]): ReactElement[] {
  const result: ReactElement[] = [];

  const findAllAndAdd = (Children: any) => {
    const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
    React.Children.toArray(children).forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === React.Fragment) {
          findAllAndAdd(child.props.children);
        } else {
          // @ts-ignore
          const inheritedNames = child.type[INHERITED_NAME] || [child.type.displayName];
          const component = !!inheritedNames.find((name: string) => names.includes(name));

          if (component) {
            result.push(child);
          }

          if (child.props.children) {
            return findAllAndAdd(child.props.children);
          }
        }
      }
    });
  };

  findAllAndAdd(Children);

  return result;
}

export default findComponent;
