import React from 'react';
// @ts-ignore
import { CHILDREN_COMPONENT } from '@semcore/core';

function getOriginChildren(Children: any): any {
  if (React.isValidElement(Children.origin) && Children.origin.type[CHILDREN_COMPONENT]) {
    return getOriginChildren(Children.origin.type);
  }
  return Children.origin;
}

export default getOriginChildren;
