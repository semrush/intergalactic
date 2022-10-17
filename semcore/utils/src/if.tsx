import { FC, ReactNode } from 'react';

export interface IIfProps {
  condition: boolean;
  children?: ReactNode;
}

const If: FC<IIfProps> = (props) => {
  const { condition, children } = props;
  return (!!condition ? children : null) as ReturnType<FC>;
};

export default If;
