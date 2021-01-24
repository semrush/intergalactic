import React, { HTMLAttributes, useContext, ComponentProps } from 'react';
import { createBaseComponent, styled, Merge } from '@semcore/core';

import { Box, IBoxProps } from '@semcore/flex-box';
import Context from '../context';

export interface ITableRowProps extends IBoxProps {
  /** Property responsible for the row interactivity */
  interactive?: boolean;
  /** The cell theme
   * @default default
   * */
  theme?: 'info' | 'success' | 'warning' | 'danger' | 'default' | false;
}

const RowInner = (props: ITableRowProps, ref) => {
  const SRow = Box;
  const { interactive, theme = 'default', styles, ...other } = props;

  return styled(styles)(
    <SRow ref={ref} tag="tr" theme={theme} interactive={interactive} {...other} />,
  );
};

RowInner.displayName = 'Row';

const RowCore = createBaseComponent<Merge<ITableRowProps, HTMLAttributes<HTMLTableRowElement>>>(
  RowInner,
);

const Row = React.forwardRef((props: ComponentProps<typeof RowCore>, ref) => {
  const contextProps = useContext(Context);
  return <RowCore ref={ref} {...contextProps} {...props} />;
});

Row.displayName = 'Row';

export default Row;
