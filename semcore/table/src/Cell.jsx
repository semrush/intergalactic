import React, { useContext } from 'react';
import { Text } from '@semcore/typography';
import { createBaseComponent, sstyled } from '@semcore/core';
import SortAsc from '@semcore/icon/SortAsc/m';
import SortDesc from '@semcore/icon/SortDesc/m';
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
  const { theme, highlighted, interactive, borderRight, borderLeft, styles } = props;

  return sstyled(styles)(
    <SCellRow
      ref={ref}
      valign="top"
      theme={theme}
      highlighted={highlighted}
      interactive={interactive}
      borderRight={borderRight}
      borderLeft={borderLeft}
      {...props}
    />,
  );
}

CellRowInner.displayName = 'CellRow';

const CellRowCore = createBaseComponent(CellRowInner);

const CellRow = React.forwardRef((props, ref) => {
  const contextProps = useContext(Context);
  const styles = sstyled.merge(contextProps.styles, props.styles);
  return <CellRowCore ref={ref} {...contextProps} {...props} styles={styles} />;
});

CellRow.displayName = 'CellRow';

function CellHeadInner(props, ref) {
  const SCellHead = Cell;
  const SCellHeadContent = 'div';
  const SSortWrapper = 'div';
  const SCellHeadIconAsc = SortAsc;
  const SCellHeadIconDesc = SortDesc;
  const { styles, children, sorting, active } = props;

  return sstyled(styles)(
    <SCellHead
      ref={ref}
      tag="th"
      noWrap
      tabIndex={sorting && 0}
      {...props}
    >
      <SCellHeadContent>
        {children}
        {sorting && (
          <SSortWrapper>
            {sorting === 'asc' && <SCellHeadIconAsc active={active} />}
            {sorting === 'desc' && <SCellHeadIconDesc active={active} />}
          </SSortWrapper>
        )}
      </SCellHeadContent>
    </SCellHead>,
  );
}

CellHeadInner.displayName = 'CellHead';

const CellHeadCore = createBaseComponent(CellHeadInner);

const CellHead = React.forwardRef((props, ref) => {
  const contextProps = useContext(Context);
  const styles = sstyled.merge(contextProps.styles, props.styles);
  return <CellHeadCore ref={ref} {...contextProps} {...props} styles={styles} />;
});

CellHead.displayName = 'CellHead';

export { CellRow, CellHead };
