import React, { HTMLAttributes } from 'react';
import { Box, Flex, IBoxProps, IFlexProps } from '@semcore/flex-box';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';

import style from './style/grid.shadow.css';

export interface IColProps extends IBoxProps {
  /** Column size */
  span?: number | boolean;
  /** Column size on device with 992px screen width and less */
  md?: number | boolean;
  /** Column width on device with 768px screen width and less */
  sm?: number | boolean;
  /** Column offset, specified in the number of columns */
  offset?: number;
  /** Column offset on device with 992px screen width and less */
  mdOffset?: number;
  /** Column offset on device with 768px screen width and less */
  smOffset?: number;
  /** Column gutter, determined from Row */
  gutter?: number;
}

export interface IRowProps extends IFlexProps {
  /**
   * Gutter between columns
   * @default 0
   */
  gutter?: number;
}

export interface IGridContext extends IRowProps {
  getColProps: PropGetter<Row['getColProps']>;
}

class Row extends Component<IRowProps> {
  static displayName = 'Row';
  static style = style;
  static defaultProps = {
    gutter: 0,
  };

  getColProps() {
    const { gutter } = this.asProps;
    return {
      gutter,
    };
  }

  render() {
    const SFlex = this.Root;
    const { gutter } = this.asProps;

    return <SFlex render={Flex} flexWrap mx={gutter ? `${gutter * -2}px` : undefined} />;
  }
}

function Col(props: IFunctionProps<IColProps>) {
  let { Root: SCol, styles, gutter, span, offset, sm, md, smOffset, mdOffset } = props;

  offset = offset || mdOffset || smOffset;
  span = span !== undefined ? span : md !== undefined ? md : sm;

  return styled(styles)(
    <SCol
      render={Box}
      px={gutter ? `${gutter * 2}px` : undefined}
      span={span === true ? span : span}
      sm={sm === true ? sm : sm}
      md={md === true ? md : md}
      offset={offset}
      smOffset={smOffset}
      mdOffset={mdOffset}
    />,
  );
}

export default createComponent<
  Merge<IRowProps, HTMLAttributes<HTMLDivElement>>,
  {
    Col: Merge<IColProps, HTMLAttributes<HTMLDivElement>>;
  },
  IGridContext
>(Row, { Col });
