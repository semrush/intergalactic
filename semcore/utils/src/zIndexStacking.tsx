import React from 'react';
import { register } from './core';

const REGISTER_KEY = 'zIndexStack';

export const useZIndexStacking = () => {
  const [zIndex, setZIndex] = React.useState(0);

  React.useEffect(() => {
    const parentZIndex = register.get(REGISTER_KEY, 0);
    const increment = 100;
    const zIndex = parentZIndex + increment;

    register.set(REGISTER_KEY, zIndex);
    setZIndex(zIndex);

    return () => {
      const current = register.get(REGISTER_KEY, zIndex);
      register.set(REGISTER_KEY, current - increment);
    };
  }, []);

  return zIndex;
};

export const zIndexStackingEnhance = () => {
  return (props: any) => {
    const { ...other } = props;
    const zIndexStacking = useZIndexStacking();
    return {
      ...other,
      zIndexStacking,
    };
  };
};
