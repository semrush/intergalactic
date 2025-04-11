import React, { RefObject } from 'react';
import { createComponent, Component, Intergalactic, Root, sstyled } from '@semcore/core';
import Tooltip, { TooltipProps } from '@semcore/tooltip';
import { Box, BoxProps } from '@semcore/flex-box';
import { useResizeObserver } from './useResizeObserver';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';
import findComponent, { isAdvanceMode } from '@semcore/core/lib/utils/findComponent';

import style from './style/ellipsis.shadow.css';
import reactToText from '@semcore/core/lib/utils/reactToText';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import pick from '@semcore/core/lib/utils/pick';
import { forkRef } from '@semcore/core/lib/utils/ref';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';

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
  textRef: RefObject<HTMLElement>;
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
  'cursorAnchoring',
];

const createMeasurerElement = (element: HTMLDivElement, text?: string) => {
  const styleElement = window.getComputedStyle(element, null);
  const temporaryElement = document.createElement('temporary-block');
  temporaryElement.style.display = styleElement.getPropertyValue('display');
  temporaryElement.style.padding = styleElement.getPropertyValue('padding');
  temporaryElement.style.position = 'absolute';
  temporaryElement.style.right = '0%';
  temporaryElement.style.bottom = '0%';
  temporaryElement.style.visibility = 'hidden';
  temporaryElement.style.fontFamily = styleElement.getPropertyValue('font-family');
  temporaryElement.style.fontSize = styleElement.getPropertyValue('font-size');
  temporaryElement.style.fontWeight = styleElement.getPropertyValue('font-weight');
  temporaryElement.style.lineHeight = styleElement.getPropertyValue('line-height');
  temporaryElement.style.whiteSpace = styleElement.getPropertyValue('white-space');
  temporaryElement.style.wordWrap = styleElement.getPropertyValue('word-wrap');

  temporaryElement.style.fontFeatureSettings =
    styleElement.getPropertyValue('font-feature-settings');
  temporaryElement.style.fontVariantNumeric = styleElement.getPropertyValue('font-variant-numeric');

  temporaryElement.innerHTML = text ?? element.innerHTML;
  return temporaryElement;
};

function isTextOverflowing(element: HTMLDivElement, multiline: boolean, text?: string): boolean {
  if (!element) return false;

  const { height: currentHeight, width: currentWidth } = element.getBoundingClientRect();
  const measuringElement = createMeasurerElement(element, text);
  let isOverflowing = false;

  document.body.appendChild(measuringElement);
  if (multiline) {
    measuringElement.style.width = `${currentWidth}px`;

    const width = measuringElement.scrollWidth;
    const height = measuringElement.getBoundingClientRect().height;

    if (Math.ceil(currentHeight) < height || Math.ceil(currentWidth) < width) {
      isOverflowing = true;
    }
  } else {
    measuringElement.style.whiteSpace = 'nowrap';
    isOverflowing = Math.ceil(currentWidth) < measuringElement.getBoundingClientRect().width;
  }

  document.body.removeChild(measuringElement);

  return isOverflowing;
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
    const { maxLine = 1, Children } = this.asProps;
    const text = reactToText(getOriginChildren(Children));
    return isTextOverflowing(this.textRef.current!, maxLine > 1, text);
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

    tooltipProps.visible = tooltipProps.visible ?? visible;
    tooltipProps.onVisibleChange = tooltipProps.onVisibleChange
      ? callAllEventHandlers(tooltipProps.onVisibleChange, this.handlerVisibleChange)
      : this.handlerVisibleChange;

    if (trim === 'middle') {
      return sstyled(styles)(
        <EllipsisMiddle
          text={text}
          styles={styles}
          tooltip={tooltip}
          containerRect={containerRect}
          containerRef={containerRef}
          textRef={this.textRef}
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
    textRef,
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
        ref={forkRef(ref, textRef)}
        tag={Tooltip}
        __excludeProps={['title']}
        {...tooltipProps}
      >
        <SBeginning>{contextValue.begining}</SBeginning>
        <STail>{contextValue.tail}</STail>
      </SContainerMiddle>,
    ) as any;
  }
  return sstyled(styles)(
    <SContainerMiddle {...otherProps} ref={containerRef ?? resizeElement}>
      <SBeginning>{contextValue.begining}</SBeginning>
      <STail>{contextValue.tail}</STail>
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
