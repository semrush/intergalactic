import React, { useContext } from 'react';
import { Text } from '@semcore/typography';
import { createBaseComponent, sstyled } from '@semcore/core';
import SortAscXS from '@semcore/icon/lib/SortAsc/xs';
import SortDescXS from '@semcore/icon/lib/SortDesc/xs';
import Context from './context';

function RootCell(props, ref) {
  const SCell = Text;
  const { valign = 'top', align: alignProps = 'left', textAlign, use, styles, ...other } = props;
  const align = textAlign ? textAlign : alignProps;

  return sstyled(styles)(
    <SCell ref={ref} tag="td" use={use} valign={valign} align={align} {...other} />,
  );
}

RootCell.displayName = 'Cell';

const Cell = createBaseComponent(RootCell);

function CellRowInner(props, ref) {
  const SCellRow = Cell;
  const { theme, highlighted, interactive, styles } = props;

  return sstyled(styles)(
    <SCellRow
      ref={ref}
      valign="top"
      theme={theme}
      highlighted={highlighted}
      interactive={interactive}
      {...props}
    />,
  );
}

CellRowInner.displayName = 'CellRow';

const CellRowCore = createBaseComponent(CellRowInner);

const CellRow = React.forwardRef((props, ref) => {
  const contextProps = useContext(Context);
  return <CellRowCore ref={ref} {...contextProps} {...props} />;
});

CellRow.displayName = 'CellRow';

function CellHeadInner(props, ref) {
  const SCellHead = Cell;
  const SCellHeadContent = 'div';
  const SCellHeadIconAsc = SortAscXS;
  const SCellHeadIconDesc = SortDescXS;
  const { children, ...other } = props;
  const { active, sorting, use, styles } = other;

  return sstyled(styles)(
    <SCellHead
      ref={ref}
      tag="th"
      noWrap
      use={use}
      active={active}
      sorting={sorting}
      tabIndex={sorting && 0}
      {...other}
    >
      <SCellHeadContent>
        {children}
        {sorting === 'asc' && <SCellHeadIconAsc active={active} />}
        {sorting === 'desc' && <SCellHeadIconDesc active={active} />}
      </SCellHeadContent>
    </SCellHead>,
  );
}

CellHeadInner.displayName = 'CellHead';

const CellHeadCore = createBaseComponent(CellHeadInner);

const CellHead = React.forwardRef((props, ref) => {
  const contextProps = useContext(Context);
  return <CellHeadCore ref={ref} {...contextProps} {...props} />;
});

CellHead.displayName = 'CellHead';

export { CellRow, CellHead };
