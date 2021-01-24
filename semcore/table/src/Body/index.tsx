import React, { HTMLAttributes, ComponentProps, useContext } from 'react';
import { Box, IBoxProps } from '@semcore/flex-box';
import { createBaseComponent, styled, Merge } from '@semcore/core';

import Context from '../context';

function BodyInner({ styles, ...other }, ref) {
  const SBody = Box;
  return styled(styles)(<SBody ref={ref} tag="tbody" {...other} />);
}

BodyInner.displayName = 'Body';

const BodyCore = createBaseComponent<Merge<IBoxProps, HTMLAttributes<HTMLTableSectionElement>>>(
  BodyInner,
);

const Body = React.forwardRef((props: ComponentProps<typeof BodyCore>, ref) => {
  const contextProps = useContext(Context);
  return <BodyCore ref={ref} {...contextProps} {...props} />;
});

Body.displayName = 'Row';

export default Body;
