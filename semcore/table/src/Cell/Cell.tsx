import React from 'react';

import { createBaseComponent, Merge, styled } from '@semcore/core';
import { ITextProps, Text } from '@semcore/typography';

export interface ICellProps extends ITextProps {
  /** Positioning content horizontally in a cell
   * @default left
   */
  align?: 'left' | 'right' | 'center' | false;
  /** Positioning content vertically in a cell
   * @default middle
   */
  valign?: 'top' | 'bottom' | 'middle' | false;
  /**
   * @default primary
   */
  use?: 'primary' | 'secondary' | false;
}

function Cell(props, ref) {
  const SCell = Text;
  const { valign = 'top', align: alignProps = 'left', textAlign, use, styles, ...other } = props;
  const align = textAlign ? textAlign : alignProps;

  return styled(styles)(
    <SCell ref={ref} tag="td" use={use} valign={valign} align={align} {...other} />,
  );
}

Cell.displayName = 'Cell';

export default createBaseComponent<
  Merge<
    ICellProps,
    React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
      React.TdHTMLAttributes<HTMLTableCellElement>
  >
>(Cell);
