import type { NSScrollArea } from '@semcore/base-components';
import { ScrollArea } from '@semcore/base-components';
import { sstyled } from '@semcore/core';
import React from 'react';

import styles from './dataTable.shadow.css';

type Props = {
  loading?: boolean;
  withHeaderScrollBar?: boolean;
  topOffset?: number;
  withAnimation: boolean;
  scrollBarInstanceRef: React.RefObject<NSScrollArea.Bar.Instance>;
};

const SCROLL_BAR_HEIGHT = 12;

export class ScrollBars extends React.PureComponent<Props> {
  render() {
    const SScrollAreaBarInHeader = ScrollArea.Bar;
    const { loading, topOffset, withHeaderScrollBar, withAnimation, scrollBarInstanceRef } = this.props;

    return sstyled(styles)(
      <>
        {withHeaderScrollBar && topOffset && !loading && (
          <SScrollAreaBarInHeader
            orientation='horizontal'
            top={topOffset - SCROLL_BAR_HEIGHT}
            zIndex={20}
            // @ts-ignore
            withAnimation={withAnimation}
          />
        )}

        {!loading && (
          <>
            <ScrollArea.Bar orientation='horizontal' zIndex={20} />
            <ScrollArea.Bar orientation='vertical' zIndex={20} instanceRef={scrollBarInstanceRef} />
          </>
        )}
      </>,
    );
  }
}
