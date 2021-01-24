import React, { useContext, ComponentProps } from 'react';

import SortDescXS from '@semcore/icon/lib/SortDesc/xs';
import SortAscXS from '@semcore/icon/lib/SortAsc/xs';
import Context from '../context';
import Cell, { ICellProps } from './Cell';
import { createBaseComponent, Merge, styled } from '@semcore/core';

export interface ITableCellHeadProps extends ICellProps {
  /** Responsible for the sort direction */
  sorting?: 'asc' | 'desc' | false;
  /** Responsible for the activity of the cell */
  active?: boolean;
}

function CellHeadInner(props, ref) {
  const SCellHead = Cell;
  const SCellHeadContent = 'div';
  const SCellHeadIconAsc = SortAscXS;
  const SCellHeadIconDesc = SortDescXS;
  const { children, ...other } = props;
  const { active, sorting, use, styles } = other;

  return styled(styles)(
    <SCellHead ref={ref} tag="th" noWrap use={use} active={active} sorting={sorting} {...other}>
      <SCellHeadContent>
        {children}
        {sorting === 'asc' && <SCellHeadIconAsc active={active} />}
        {sorting === 'desc' && <SCellHeadIconDesc active={active} />}
      </SCellHeadContent>
    </SCellHead>,
  );
}

CellHeadInner.displayName = 'CellHead';

const CellHeadCore = createBaseComponent<
  Merge<ITableCellHeadProps, React.ThHTMLAttributes<HTMLTableHeaderCellElement>>
>(CellHeadInner);

const CellHead = React.forwardRef((props: ComponentProps<typeof CellHeadCore>, ref) => {
  const contextProps = useContext(Context);
  return <CellHeadCore ref={ref} {...contextProps} {...props} />;
});

CellHead.displayName = 'CellHead';

export default CellHead;
