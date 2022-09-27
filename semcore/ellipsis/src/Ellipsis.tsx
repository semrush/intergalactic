import React, { useEffect, useRef, useState } from 'react';
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
  resizeObserver: () => void;
};

type AsPropsMiddle = {
  text?: string;
  tooltip?: string;
  styles?: React.CSSProperties;
  resizeObserver: () => void;
};

const gotSize = () => {
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
  const size = gotSize();
  const [blockWidth, setBlockWidth] = useState(null);

  if (!resizeObserver) {
    const width = useResizeObserver(resizeElement, null).size.width;
    setBlockWidth(width);
  }

  useEffect(() => {
    if (resizeObserver) {
      const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        setBlockWidth(entries[0].contentRect.width);
      });
      if (containerRef) {
        resizeObserver.subscribe(containerRef.current);
        ro.observe(containerRef.current);
      }
      if (resizeElement && resizeElement.current) {
        resizeObserver.subscribe(resizeElement?.current);
        ro.observe(resizeElement?.current);
      }

      return () => ro.disconnect();
    }
  }, []);

  const STail = 'span';
  const SBeginning = 'span';
  const symbolAmount = Math.round(blockWidth / size);

  if (tooltip) {
    return sstyled(styles)(
      <Tooltip interaction="hover" title={text} ref={containerRef ?? resizeElement} tag={Flex}>
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </Tooltip>,
    );
  } else {
    return sstyled(styles)(
      <Flex tag="span" ref={containerRef ?? resizeElement}>
        <SBeginning>{text.slice(0, text.length - symbolAmount / 2 - 1)}</SBeginning>
        <STail>{text.slice(text.length - symbolAmount / 2 - 1)}</STail>
      </Flex>,
    );
  }
};

const Ellipsis = createComponent(RootEllipsis);

export default Ellipsis;
