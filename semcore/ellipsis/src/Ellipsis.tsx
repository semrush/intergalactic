import React, { RefObject, useRef } from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import Tooltip from '@semcore/tooltip';
import { Flex } from '@semcore/flex-box';
import { useResizeObserver } from './useResizeObserver';

import style from './style/ellipsis.shadow.css';
import reactToText from '@semcore/utils/lib/reactToText';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

type AsProps = {
  maxline?: number;
  trim?: string;
  tooltip?: string;
  styles?: React.CSSProperties;
  resizeObserver?: { width: number };
};

type AsPropsMiddle = {
  text?: string;
  tooltip?: string;
  styles?: React.CSSProperties;
  resizeObserver?: { width: number };
};

const gotSize = (ref: RefObject<HTMLElement>) => {
  if (ref.current) {
  }

  const dateSpan = document.createElement('span');
  dateSpan.innerHTML = 'a';
  document.body.appendChild(dateSpan);
  const rect = dateSpan.getBoundingClientRect();
  dateSpan.remove();
  return rect.width;
};

class RootEllipsis extends Component<AsProps> {
  static displayName = 'Ellipsis';
  static style = style;
  static defaultProps: AsProps = {
    trim: 'end',
    tooltip: 'visible',
  };

  render() {
    const SEllipsis = this.Root;
    const { styles, Children, maxline, tooltip, trim, resizeObserver, containerRef } = this.asProps;
    const text = reactToText(getOriginChildren(Children));

    if (trim === 'middle') {
      return sstyled(styles)(
        <EllipsisMiddle
          text={text}
          styles={styles}
          tooltip={tooltip}
          resizeObserver={resizeObserver}
          containerRef={containerRef}
        />,
      );
    }
    if (tooltip) {
      return sstyled(styles)(
        <Tooltip interaction="hover" title={text} tag={Flex}>
          <SEllipsis use:maxline={maxline} render="div" tag="div">
            <Children />
          </SEllipsis>
        </Tooltip>,
      );
    }
    return sstyled(styles)(
      <SEllipsis use:maxline={maxline} render="div" tag="div">
        <Children />
      </SEllipsis>,
    );
  }
}

const EllipsisMiddle: React.FC<AsPropsMiddle> = (props) => {
  const { styles, text, tooltip, resizeObserver, containerRef } = props;
  const resizeElement = useRef(null);

  const blockWidth = useResizeObserver(resizeElement, resizeObserver).width;
  const size = gotSize(containerRef ?? resizeElement);
  const STail = 'span';
  const SBeginning = 'span';
  const symbolAmount = Math.round(blockWidth / size);

  if (tooltip) {
    return sstyled(styles)(
      <Tooltip interaction="hover" title={text} ref={containerRef ?? resizeElement} tag={Flex}>
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </Tooltip>,
    ) as any;
  } else {
    return sstyled(styles)(
      <Flex tag="span" ref={containerRef ?? resizeElement}>
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </Flex>,
    ) as any;
  }
};

const Ellipsis = createComponent(RootEllipsis);

export default Ellipsis;
