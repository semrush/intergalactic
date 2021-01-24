/* eslint-disable */
import React from 'react';

export type ChildrenType<T> = ((props: T) => React.ReactNode) | React.ReactNode;

export interface IIfChildrenProps<T extends {}> {
  context: T;
  children: ChildrenType<T>;
}

function IfChildren<T extends {}>(props: IIfChildrenProps<T>) {
  const { children, context } = props;
  if (typeof children === 'function') {
    return children(context);
  }
  return children;
}

export default IfChildren;
