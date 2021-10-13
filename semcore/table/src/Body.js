import React, { useContext } from 'react';
import { Box } from '@semcore/flex-box';
import { createBaseComponent, sstyled } from '@semcore/core';

import Context from './context';

function BodyInner({ styles, ...other }, ref) {
  const SBody = Box;
  return sstyled(styles)(<SBody ref={ref} tag="tbody" {...other} />);
}

BodyInner.displayName = 'Body';

const BodyCore = createBaseComponent(BodyInner);

const Body = React.forwardRef((props, ref) => {
  const contextProps = useContext(Context);
  return <BodyCore ref={ref} {...contextProps} {...props} />;
});

Body.displayName = 'Row';

export default Body;
