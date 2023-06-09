import { CSSProperties, Ref } from 'react';
import cn from 'classnames';
import { sstyled } from '@semcore/core';
import { forkRef } from './ref';

export function callAllEventHandlers(...fns) {
  return (...args) =>
    !fns.some((fn) => {
      let result;
      if (fn) {
        result = fn(...args);
      }
      return typeof result === 'boolean' && !result;
    });
}

export function assignHandlers(props, source) {
  return Object.keys(source).reduce((proxySource, propName) => {
    if (typeof source[propName] === 'function' && propName.startsWith('on')) {
      proxySource[propName] = callAllEventHandlers(props[propName], source[propName]);
    }
    return proxySource;
  }, {});
}

function assignHandlersInner(props, source) {
  return Object.keys(source).reduce((proxySource, propName) => {
    if (propName !== 'ref' && propName.startsWith('on')) {
      if (typeof source[propName] === 'function' && typeof props[propName] === 'function') {
        proxySource[propName] = callAllEventHandlers(props[propName], source[propName]);
      } else if (typeof source[propName] === 'function') {
        proxySource[propName] = source[propName];
      } else if (typeof props[propName] === 'function') {
        proxySource[propName] = props[propName];
      }
    }
    return proxySource;
  }, {});
}

export interface AssignableProps {
  ref?: Ref<any>;
  style?: CSSProperties;
  className?: string;
  styles?: { [key: string]: string };

  [key: string]: any;
}

export default function assignProps<P extends AssignableProps, S extends AssignableProps>(
  props: P = {} as P,
  source: S = {} as S,
) {
  // @ts-ignore
  if (props === source) return props;
  const newProps = {
    ...source,
    ...props,
    ...assignHandlersInner(props, source),
  };

  // because react set getter for ref
  const sourceDescriptorRef = Object.getOwnPropertyDescriptor(source, 'ref');
  const propsDescriptorRef = Object.getOwnPropertyDescriptor(props, 'ref');
  if (
    sourceDescriptorRef &&
    sourceDescriptorRef.configurable &&
    propsDescriptorRef &&
    propsDescriptorRef.configurable
  ) {
    newProps.ref = forkRef(source.ref, props.ref);
  }

  if (props.forwardRef) {
    newProps.ref = forkRef(newProps.ref, props.forwardRef);
  }

  if (source.style && props.style) {
    newProps.style = {
      ...source.style,
      ...props.style,
    };
  }

  if (source.className) {
    newProps.className = cn(props.className, source.className);
  }

  if (source.styles && props.styles) {
    newProps.styles = sstyled.merge(source.styles, props.styles);
  }

  return newProps;
}
