/* eslint-disable */
import React, { FC } from 'react';

export interface IIfProps {
  condition: boolean;
}

const If: FC<IIfProps> = (props) => {
  const { condition, children } = props;
  return (!!condition ? children : null) as ReturnType<FC>;
};

export default If;
