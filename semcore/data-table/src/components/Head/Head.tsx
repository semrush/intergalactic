import * as React from 'react';
import { Component, createComponent, Intergalactic, Root, sstyled } from '@semcore/core';
import { DataTableHeadProps, HeadPropsInner } from './Head.types';
import {
  Box,
  hideScrollBarsFromScreenReadersContext,
  ScreenReaderOnly,
  ScrollArea,
} from '@semcore/base-components';

import style from './head.shadow.css';
import { Column } from '../Column/Column';
import { DataTableColumnProps } from '../Column/Column.types';
import { getScrollOffsetValue } from '../../utils';

const displayContents = { display: 'contents' };

class HeadRoot extends Component<DataTableHeadProps, {}, {}, [], HeadPropsInner> {
  static displayName = 'Head';
  static style = style;

  getColumnProps(_: any, index: number) {
    const { use, columns } = this.asProps;

    return {
      use,
      'aria-colindex': index + 1,
      ref: columns[index].ref,
    };
  }

  render() {
    const SHead = Root;
    const { Children, styles, columns, scrollRef, withScrollBar } = this.asProps;

    const [offsetLeftSum, offsetRightSum] = getScrollOffsetValue(columns);

    return sstyled(styles)(
      // <hideScrollBarsFromScreenReadersContext.Provider value={true}>
      //     <ScrollArea
      //         leftOffset={offsetLeftSum}
      //         rightOffset={offsetRightSum}
      //         shadow
      //     >
      //       <ScrollArea.Container ref={scrollRef} role='rowgroup' tabIndex={-1}>
      <SHead render={Box} role='row'>
        <Children />
      </SHead>,
      //       </ScrollArea.Container>
      //       {Boolean(withScrollBar) && (
      //           <div style={displayContents}>
      //             <div style={displayContents}>
      //               <div style={displayContents}>
      //                 <ScrollArea.Bar orientation='horizontal' />
      //               </div>
      //             </div>
      //           </div>
      //       )}
      //     </ScrollArea>
      //     {/*<ScreenReaderOnly aria-hidden={true} id={this.sortableColumnDescribeId()}>*/}
      //     {/*  {getI18nText?.('sortableColumn')}*/}
      //     {/*</ScreenReaderOnly>*/}
      // </hideScrollBarsFromScreenReadersContext.Provider>
    );
  }
}

export const Head = createComponent(HeadRoot, { Column }) as Intergalactic.Component<
  'div',
  DataTableHeadProps
> & {
  Column: Intergalactic.Component<'div', DataTableColumnProps>;
};
