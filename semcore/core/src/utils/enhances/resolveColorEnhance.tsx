import React from 'react';

import assignProps from '../assignProps';
import { useForkRef } from '../ref';
import { useColorResolver } from '../use/useColorResolver';

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
