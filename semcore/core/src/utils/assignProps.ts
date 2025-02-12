import { CSSProperties, DetailedHTMLProps, Ref, StyleHTMLAttributes } from 'react';
import cn from 'classnames';
import { sstyled } from '../styled/index';
import { forkRef } from './ref';

export function callAllEventHandlers(...fns: Array<Function | undefined>) {
  return (...args: any[]) =>
    !fns.some((fn) => {
      let result;
      if (fn) {
        result = fn(...args);
      }
      return typeof result === 'boolean' && !result;
    });
}

export function assignHandlers(props: any, source: any) {
  return Object.keys(source).reduce((proxySource: any, propName) => {
    if (typeof source[propName] === 'function' && propName.startsWith('on')) {
      proxySource[propName] = callAllEventHandlers(props[propName], source[propName]);
    }
    return proxySource;
  }, {});
}

function assignHandlersInner(props: any, source: any) {
  return Object.keys(source).reduce((proxySource: any, propName) => {
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
  styles?: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;

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
  for (const key in source) {
    if (key.startsWith('use:')) {
      const originalKey = key.slice('use:'.length);
      newProps[originalKey] = source[key];
    }
  }
  for (const key in props) {
    if (key.startsWith('use:')) {
      const originalKey = key.slice('use:'.length);
      newProps[originalKey] = props[key];
    }
  }

  // because react set getter for ref
  const sourceDescriptorRef = Object.getOwnPropertyDescriptor(source, 'ref');
  const propsDescriptorRef = Object.getOwnPropertyDescriptor(props, 'ref');
  if (sourceDescriptorRef?.configurable && propsDescriptorRef?.configurable) {
    newProps.ref = forkRef(source.ref as any, props.ref as any);
  }

  if (props.forwardRef) {
    newProps.ref = forkRef(newProps.ref as any, props.forwardRef as any);
    newProps.forwardRef = newProps.ref;
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
