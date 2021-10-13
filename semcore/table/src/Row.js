import React, { useContext } from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Context from './context';

const RowInner = (props, ref) => {
  const SRow = Box;
  const { interactive, theme = 'default', styles, ...other } = props;

  return sstyled(styles)(
    <SRow ref={ref} tag="tr" theme={theme} interactive={interactive} {...other} />,
  );
};

RowInner.displayName = 'Row';

const RowCore = createBaseComponent(RowInner);

const Row = React.forwardRef((props, ref) => {
  const contextProps = useContext(Context);
  return <RowCore ref={ref} {...contextProps} {...props} />;
});

Row.displayName = 'Row';

export default Row;
