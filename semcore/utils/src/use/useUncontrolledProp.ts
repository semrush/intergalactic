import React from 'react';

export const useUncontrolledProp = <T>(
  outerValue: T,
  propDefaultValue: T,
  outerHandler?: (value: T) => void,
) => {
  const [innerValue, setInnerValue] = React.useState<T>(propDefaultValue);

  return outerHandler
    ? ([outerValue, outerHandler] as const)
    : ([innerValue, setInnerValue] as const);
};
