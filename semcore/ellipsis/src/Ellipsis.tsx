import React, { RefObject, useRef, useMemo, useState, useLayoutEffect } from 'react';
import createComponent, { Component, sstyled } from '@semcore/core';
import Tooltip from '@semcore/tooltip';
import { Box } from '@semcore/flex-box';
import { useResizeObserver } from './useResizeObserver';

import style from './style/ellipsis.shadow.css';
import reactToText from '@semcore/utils/lib/reactToText';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

type AsProps = {
  maxLine?: number;
  trim?: 'end' | 'middle';
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  containerRef?: RefObject<HTMLElement | null>;
};

type AsPropsMiddle = {
  text: string;
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
  containerRef?: RefObject<HTMLElement | null>;
};


function isTextOverflowing(element: HTMLElement | null, multiline: boolean): boolean {

  if (element && !multiline) {
    const { width: currentWidth } = element.getBoundingClientRect();

    element.style.width = 'max-content';
    element.style.overflow = 'initial';

    const { width: initialWidth } = element.getBoundingClientRect();

    element.style.width = '';
    element.style.overflow = '';

    return currentWidth < initialWidth;
  }

  if (element && multiline) {
    const { height: currentHeight } = element.getBoundingClientRect();

    element.style.webkitLineClamp = 'unset';
    element.style.overflow = 'initial';

    const { height: initialHeight } = element.getBoundingClientRect();

    element.style.webkitLineClamp = '';
    element.style.overflow = '';

    return currentHeight < initialHeight;
  }

  return false;
}


class RootEllipsis extends Component<AsProps> {
  static displayName = 'Ellipsis';
  static style = style;
  static defaultProps: AsProps = {
    trim: 'end',
    tooltip: true,
  };

  state = {
    visible: false,
  };

  textRef = React.createRef<HTMLElement>();

  handlerVisibleChange = (visible: boolean) => {
    const { maxLine = 1 } = this.asProps;
    const $text = this.textRef.current;
    if (isTextOverflowing($text, maxLine > 1)) {
      this.setState({ visible });
    }
  };

  render() {
    const SEllipsis = this.Root;
    const SContainer = Tooltip;
    const { styles, Children, maxLine, tooltip, trim, containerRect, containerRef } = this.asProps;
    const { visible } = this.state;
    const text = reactToText(getOriginChildren(Children));

    if (trim === 'middle') {
      return sstyled(styles)(
        <EllipsisMiddle
          text={text}
          styles={styles}
          tooltip={tooltip}
          containerRect={containerRect}
          containerRef={containerRef}
        />,
      );
    }
    if (tooltip) {
      return sstyled(styles)(
        <SContainer interaction='hover' title={text} visible={visible} onVisibleChange={this.handlerVisibleChange}>
          <SEllipsis render={Box} ref={this.textRef} maxLine={maxLine}>
            <Children />
          </SEllipsis>
        </SContainer>,
      );
    }
    return sstyled(styles)(
      <SEllipsis render={Box} maxLine={maxLine}>
        <Children />
      </SEllipsis>,
    );
  }
}

const EllipsisMiddle: React.FC<AsPropsMiddle> = (props) => {
  const { styles, text, tooltip, containerRect, containerRef } = props;
  const resizeElement = useRef<HTMLElement | null>(null);
  const [dimension, setDimension] = useState<{ fontSize: string; symbolWidth: number }>({
    fontSize: '14',
    symbolWidth: 0,
  });
  const blockWidth = useResizeObserver(resizeElement, containerRect).width;

  useLayoutEffect(() => {
    const dateSpan = document.createElement('temporary-block');
    dateSpan.setAttribute('style', `fontSize: ${dimension.fontSize}px`);
    dateSpan.innerHTML = 'a';
    document.body.appendChild(dateSpan);
    const rect = dateSpan.getBoundingClientRect();
    dateSpan.remove();

    setDimension({
      fontSize: window
        // @ts-ignore
        .getComputedStyle(containerRef?.current ?? resizeElement.current, null)
        .getPropertyValue('font-size'),
      symbolWidth: rect.width,
    });
  }, []);

  const STail = 'span';
  const SBeginning = 'span';
  const SContainerMiddle = Box;
  const displayedSymbols = useMemo(
    () => Math.round(blockWidth / dimension.symbolWidth),
    [blockWidth, dimension.symbolWidth],
  );

  if (tooltip) {
    return sstyled(styles)(
      <SContainerMiddle
        interaction={text.length > displayedSymbols ? 'hover' : 'none'}
        title={text}
        ref={containerRef ?? resizeElement}
        tag={Tooltip}
      >
        <SBeginning>{text.substring(0, text.length - displayedSymbols / 2 - 1)}</SBeginning>
        <STail>{text.substring(text.length - displayedSymbols / 2 - 1)}</STail>
      </SContainerMiddle>,
    ) as any;
  } else {
    return sstyled(styles)(
      <SContainerMiddle ref={containerRef ?? resizeElement}>
        <SBeginning>{text.substring(0, text.length - displayedSymbols / 2 - 1)}</SBeginning>
        <STail>{text.substring(text.length - displayedSymbols / 2 - 1)}</STail>
      </SContainerMiddle>,
    ) as any;
  }
};

const Ellipsis = createComponent(RootEllipsis);

export default Ellipsis;
