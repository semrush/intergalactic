import React from 'react';
import { useColorResolver } from '../use/useColorResolver';
import { useForkRef } from '../ref';
import assignProps from '../assignProps';

const resolveColorEnhance = () => {
  return (props: any) => {
    const { ref } = props;
    const internalRef = React.useRef<HTMLElement>();
    const resolveColor = useColorResolver();

    return assignProps(props, {
      ref: useForkRef(ref, internalRef),
      resolveColor,
    });
  };
};

export default resolveColorEnhance;
