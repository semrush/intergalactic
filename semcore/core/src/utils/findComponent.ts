import React, { ReactElement, MutableRefObject } from 'react';
import getOriginChildren from './getOriginChildren';
import { CHILDREN_COMPONENT, INHERITED_NAME } from '../core-types/symbols';

function findComponent<P = any>(
  Children: any,
  names: string[],
  recursively?: boolean,
  limit = 100,
): ReactElement<P> | undefined {
  const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
  return React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        return findComponent(child.props.children, names, recursively, limit);
      }
      // @ts-ignore
      const inheritedNames = child.type[INHERITED_NAME] || [child.type.displayName];
      const result = !!inheritedNames.find((name: string) => names.includes(name));

      if (!result && child.props.children && recursively && limit > 0) {
        return findComponent(child.props.children, names, recursively, limit - 1);
      }

      return result;
    }
  }) as ReactElement<P> | undefined;
}

export function isAdvanceMode(Children: any, name: string[], recursively?: boolean) {
  const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
  if (!children) return false;
  if (typeof children === 'function') {
    return true;
  }
  return !!findComponent(children, name, recursively);
}

type IntergalacticComponent = ReactElement & {
  ref?: MutableRefObject<HTMLElement>;
};

export function findAllComponents(Children: any, names: string[]): IntergalacticComponent[] {
  const result: IntergalacticComponent[] = [];

  const findAllAndAdd = (Children: any) => {
    const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
    React.Children.toArray(children).forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === React.Fragment) {
          findAllAndAdd(child.props.children);
        } else if (
          typeof child.type === 'function' &&
          CHILDREN_COMPONENT in child.type &&
          child.type[CHILDREN_COMPONENT]
        ) {
          findAllAndAdd(child.type);
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

/**
 * Extract some components from Children and return them and rest of components as tuple.
 */
export function extractFrom(Children: any, names: string[]): IntergalacticComponent[][] {
  const extracted: IntergalacticComponent[] = [];
  const rest: IntergalacticComponent[] = [];

  const extractor = (Children: any) => {
    const children = Children[CHILDREN_COMPONENT] ? getOriginChildren(Children) : Children;
    React.Children.toArray(children).forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === React.Fragment) {
          extractor(child.props.children);
        } else if (
          typeof child.type === 'function' &&
          CHILDREN_COMPONENT in child.type &&
          child.type[CHILDREN_COMPONENT]
        ) {
          extractor(child.type);
        } else {
          // @ts-ignore
          const inheritedNames = child.type[INHERITED_NAME] || [child.type.displayName];
          const component = !!inheritedNames.find((name: string) => names.includes(name));

          if (component) {
            extracted.push(child);
          } else {
            rest.push(child);
          }
        }
      }
    });
  };

  extractor(Children);

  return [extracted, rest];
}

export default findComponent;
