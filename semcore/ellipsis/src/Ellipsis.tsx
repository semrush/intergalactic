import React, { RefObject } from 'react';
import createComponent, { Component, Intergalactic, Root, sstyled } from '@semcore/core';
import Tooltip, { TooltipProps } from '@semcore/tooltip';
import { Box, BoxProps } from '@semcore/flex-box';
import { useResizeObserver } from './useResizeObserver';
import useEnhancedEffect from '@semcore/utils/lib/use/useEnhancedEffect';
import findComponent, { isAdvanceMode } from '@semcore/utils/lib/findComponent';

import style from './style/ellipsis.shadow.css';
import reactToText from '@semcore/utils/lib/reactToText';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';
import pick from '@semcore/utils/lib/pick';

type AsProps = {
  maxLine?: number;
  trim?: 'end' | 'middle';
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };

  containerRef?: RefObject<HTMLDivElement>;
  includeTooltipProps?: string[];
  __excludeProps?: string[];
};

type AsPropsMiddle = {
  text: string;
  tooltip?: boolean;
  styles?: React.CSSProperties;
  containerRect?: { width: number };

  containerRef?: RefObject<HTMLDivElement>;
  tooltipProps: TooltipProps;
  children?: React.ReactNode;
  advanceMode?: boolean;
  tag?: React.ElementType;
};

type EllipsisProps = BoxProps &
  Partial<TooltipProps> & {
    /**
     * Rows count in multiline Ellipsis
     * @default 1
     */
    maxLine?: number;
    /**
     * Trimming type
     * @default end
     */
    trim?: 'end' | 'middle';
    /**
     * Show tooltip
     * @default true
     */
    tooltip?: boolean;
    /**
     * Ref to the item that will be observed by ResizeObserver
     */
    // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
    containerRef?: RefObject<HTMLDivElement>;
    /**
     * Explicit sizes of container text should be trimmed in
     **/
    containerRect?: { width: number };
    /** List of props that will be passed to tooltip
     * @default ['title', 'theme', 'strategy', 'modifiers', 'placement', 'interaction', 'timeout', 'visible', 'defaultVisible', 'onVisibleChange', 'offset', 'preventOverflow', 'arrow', 'flip', 'computeStyles', 'eventListeners', 'onFirstUpdate']
     */
    includeTooltipProps?: string[];
  };

const defaultTooltipProps = [
  'title',
  'theme',
  'strategy',
  'modifiers',
  'placement',
  'interaction',
  'timeout',
  'visible',
  'defaultVisible',
  'onVisibleChange',
  'offset',
  'preventOverflow',
  'arrow',
  'flip',
  'computeStyles',
  'eventListeners',
  'onFirstUpdate',
];

const createMeasurerElement = (element: HTMLDivElement) => {
  const styleElement = window.getComputedStyle(element, null);
  const temporaryElement = document.createElement('temporary-block');
  temporaryElement.style.display = 'inline-block';
  temporaryElement.style.padding = '0';
  temporaryElement.style.position = 'absolute';
  temporaryElement.style.right = '150%';
  temporaryElement.style.bottom = '150%';
  temporaryElement.style.visibility = 'hidden';
  temporaryElement.style.fontFamily = styleElement.getPropertyValue('font-family');
  temporaryElement.style.fontSize = styleElement.getPropertyValue('font-size');
  temporaryElement.style.fontWeight = styleElement.getPropertyValue('font-weight');

  temporaryElement.innerHTML = element.innerHTML;
  return temporaryElement;
};

function isTextOverflowing(element: HTMLDivElement, multiline: boolean): boolean {
  if (!element) return false;

  const { height: currentHeight, width: currentWidth } = element.getBoundingClientRect();
  const measuringElement = createMeasurerElement(element);
  let currentSize;
  let initialSize;
  document.body.appendChild(measuringElement);
  if (multiline) {
    currentSize = currentHeight;
    measuringElement.style.width = `${currentWidth}px`;
    initialSize = measuringElement.getBoundingClientRect().height;
  } else {
    currentSize = currentWidth;
    measuringElement.style.whiteSpace = 'nowrap';
    initialSize = measuringElement.getBoundingClientRect().width;
  }
  document.body.removeChild(measuringElement);
  return currentSize < initialSize;
}

const forcedAdvancedMode = { forcedAdvancedMode: true } as any;
const noAdvancedMode = {} as any;

class RootEllipsis extends Component<AsProps> {
  static displayName = 'Ellipsis';
  static style = style;
  static defaultProps: AsProps = {
    trim: 'end',
    tooltip: true,
    includeTooltipProps: defaultTooltipProps,
    __excludeProps: ['title'],
  };

  state = {
    visible: false,
  };

  textRef = React.createRef<HTMLDivElement>();

  showTooltip() {
    const { maxLine = 1 } = this.asProps;
    return isTextOverflowing(this.textRef.current!, maxLine > 1);
  }

  handlerVisibleChange = (visible: boolean) => {
    this.setState({ visible: visible && this.showTooltip() });
  };

  getContentProps() {
    return {
      ref: this.textRef,
      maxLine: this.asProps.maxLine,
    };
  }

  getPopperProps() {
    const { Children, includeTooltipProps } = this.asProps;
    const text = reactToText(getOriginChildren(Children));
    const tooltipProps = pick(this.asProps, includeTooltipProps as any) as TooltipProps;
    return { children: text, ...tooltipProps };
  }

  render() {
    const SEllipsis = this.Root;
    const SContainer = Tooltip;
    const SNoTooltipContainer = Box;
    const {
      styles,
      Children,
      maxLine,
      tooltip,
      trim,
      containerRect,
      containerRef,
      includeTooltipProps,
      children,
      ...other
    } = this.asProps;
    const { visible } = this.state;
    const advancedContent = findComponent(Children, [(Ellipsis as any).Content.displayName]);
    const text = reactToText(advancedContent || getOriginChildren(Children));
    const advanceMode = isAdvanceMode(Children, [
      (Ellipsis as any).Content.displayName,
      (Ellipsis as any).Popper.displayName,
    ]);
    const tooltipProps = pick(this.asProps, includeTooltipProps as any) as TooltipProps;
    if (trim === 'middle') {
      return sstyled(styles)(
        <EllipsisMiddle
          text={text}
          styles={styles}
          tooltip={tooltip}
          containerRect={containerRect}
          containerRef={containerRef}
          tooltipProps={tooltipProps}
          advanceMode={advanceMode}
          {...other}
        >
          <Children />
        </EllipsisMiddle>,
      );
    }
    if (tooltip) {
      return sstyled(styles)(
        <SContainer
          interaction='hover'
          title={!advanceMode ? text : undefined}
          visible={visible}
          onVisibleChange={this.handlerVisibleChange}
          {...tooltipProps}
          {...(advanceMode ? forcedAdvancedMode : noAdvancedMode)}
        >
          {advanceMode ? (
            <Children />
          ) : (
            <SEllipsis render={Box} ref={this.textRef} maxLine={maxLine} {...other}>
              <Children />
            </SEllipsis>
          )}
        </SContainer>,
      );
    }
    return sstyled(styles)(
      <SNoTooltipContainer>
        {advanceMode ? (
          <Children />
        ) : (
          <SEllipsis render={Box} ref={this.textRef} maxLine={maxLine} {...other}>
            <Children />
          </SEllipsis>
        )}
      </SNoTooltipContainer>,
    );
  }
}

const EllipsisMiddleContext = React.createContext<null | {
  begining: string;
  tail: string;
  ref: React.RefObject<HTMLElement>;
}>(null);

const EllipsisMiddle: React.FC<AsPropsMiddle> = (props) => {
  const {
    styles,
    text,
    tooltip,
    containerRect,
    containerRef,
    tooltipProps,
    children,
    advanceMode,
    ...otherProps
  } = props;
  const resizeElement = React.useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = React.useState<{ fontSize: string; symbolWidth: number }>({
    fontSize: '14',
    symbolWidth: 0,
  });
  const blockWidth = useResizeObserver(resizeElement, containerRect).width;

  useEnhancedEffect(() => {
    const node = containerRef?.current || resizeElement?.current;
    if (!node) return;

    const dateSpan = document.createElement('temporary-block');
    dateSpan.setAttribute('style', `fontSize: ${dimension.fontSize}px`);
    dateSpan.innerHTML = 'a';
    document.body.appendChild(dateSpan);
    const rect = dateSpan.getBoundingClientRect();

    setDimension({
      fontSize: window.getComputedStyle(node, null).getPropertyValue('font-size'),
      symbolWidth: rect.width,
    });
    document.body.removeChild(dateSpan);
  }, []);

  const STail = 'span';
  const SBeginning = 'span';
  const SContainerMiddle = props.tag || Box;
  const SAdvancedModeContainerMiddle = Tooltip;
  const displayedSymbols = React.useMemo(
    () => Math.round(blockWidth / dimension.symbolWidth),
    [blockWidth, dimension.symbolWidth],
  );

  const interaction = text.length > displayedSymbols ? 'hover' : 'none';
  const ref = containerRef ?? resizeElement;
  const contextValue = React.useMemo(
    () => ({
      begining: text.substring(0, text.length - displayedSymbols / 2 - 1),
      tail: text.substring(text.length - displayedSymbols / 2 - 1),
      ref,
    }),
    [text, displayedSymbols],
  );

  if (advanceMode) {
    return sstyled(styles)(
      <SAdvancedModeContainerMiddle
        interaction={interaction}
        {...tooltipProps}
        {...forcedAdvancedMode}
      >
        <EllipsisMiddleContext.Provider value={contextValue}>
          {children}
        </EllipsisMiddleContext.Provider>
      </SAdvancedModeContainerMiddle>,
    ) as any;
  }
  if (tooltip) {
    return sstyled(styles)(
      <SContainerMiddle
        interaction={interaction}
        title={text as any}
        ref={ref}
        tag={Tooltip}
        __excludeProps={['title']}
        {...tooltipProps}
      >
        <SBeginning>{text.substring(0, text.length - displayedSymbols / 2 - 1)}</SBeginning>
        <STail>{text.substring(text.length - displayedSymbols / 2 - 1)}</STail>
      </SContainerMiddle>,
    ) as any;
  }
  return sstyled(styles)(
    <SContainerMiddle {...otherProps} ref={containerRef ?? resizeElement}>
      <SBeginning>{text.substring(0, text.length - displayedSymbols / 2 - 1)}</SBeginning>
      <STail>{text.substring(text.length - displayedSymbols / 2 - 1)}</STail>
    </SContainerMiddle>,
  ) as any;
};

type EllipsisContentAsProps = {
  styles: any;
  Children: React.FC;
};

const Content: React.FC<EllipsisContentAsProps> = ({ styles, Children }) => {
  const SEllipsis = Root;
  const ellipsisMiddleContext = React.useContext(EllipsisMiddleContext);
  const STail = 'span';
  const SBeginning = 'span';

  if (ellipsisMiddleContext) {
    const { begining, tail, ref } = ellipsisMiddleContext;
    return sstyled(styles)(
      <SEllipsis render={Tooltip.Trigger} middle-mod ref={ref}>
        <SBeginning>{begining}</SBeginning>
        <STail>{tail}</STail>
      </SEllipsis>,
    ) as any;
  }

  return sstyled(styles)(
    <SEllipsis render={Tooltip.Trigger}>
      <Children />
    </SEllipsis>,
  ) as any;
};

const Ellipsis = createComponent(RootEllipsis, {
  Content,
  Popper: Tooltip.Popper,
}) as any as Intergalactic.Component<'div', EllipsisProps> & {
  Content: typeof Box;
  Popper: typeof Tooltip.Popper;
};

export default Ellipsis;
