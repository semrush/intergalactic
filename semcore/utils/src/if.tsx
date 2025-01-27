import type { UnknownProperties } from './core/index';
import type { FC, ReactNode } from 'react';

/** @deprecated */
export interface IIfProps extends IfProps, UnknownProperties {}
export type IfProps = {
  condition: boolean;
  children?: ReactNode;
};

const If: FC<IIfProps> = (props) => {
  const { condition, children } = props;
  return (condition ? children : null) as ReturnType<FC>;
};

export default If;
