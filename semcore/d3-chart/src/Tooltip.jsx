import { Popper, Box } from '@semcore/base-components';
import { Component, Root, sstyled } from '@semcore/core';
import findComponent from '@semcore/core/lib/utils/findComponent';
import { useColorResolver } from '@semcore/core/lib/utils/use/useColorResolver';
import React from 'react';

import createElement from './createElement';
import { PatternSymbol } from './Pattern';
import style from './style/tooltip.shadow.css';
import { getChartDefaultColorName } from './utils';

/**
 * `TooltipDotRenderContext` is a hack to bypass problem that getDotProps doesn't work for D3 tooltip.
 * Probably it may be removed after migrating to a new core.
 */
const TooltipDotRenderContext = React.createContext({ index: -1, indexKeysCache: new Set() });

class TooltipRoot extends Component {
  static displayName = 'Tooltip';

  static style = style;

  state = {
    $visible: false,
    anchorProps: {},
    tooltipProps: {},
  };

  renderContext = { index: -1, indexKeysCache: new Set() };

  handlerCancel = () => false;

  getTriggerProps() {
    const { x, y, hideHoverLine } = this.asProps;
    return { x, y, hideHoverLine };
  }

  getPopperProps() {
    if (this.asProps.excludeAnchorProps) {
      return {
        $visible: this.state.$visible,
        ...this.state.tooltipProps,
      };
    }

    return {
      $visible: this.state.$visible,
      ...this.state.anchorProps,
      ...this.state.tooltipProps,
    };
  }

  virtualElementPosition = { x: 0, y: 0 };
  virtualTriggerElement = null;
  unsubscribe = [];
  componentDidMount() {
    const { eventEmitter, plotId } = this.asProps;

    this.unsubscribe.push(
      eventEmitter.subscribe(`setTooltipRenderingProps_${plotId}`, (anchorProps, tooltipProps) => {
        this.setState({ anchorProps, tooltipProps });
      }),
      eventEmitter.subscribe(`setTooltipVisible_${plotId}`, (visible) =>
        this.setState({ $visible: visible }),
      ),
      eventEmitter.subscribe(`setTooltipPosition_${plotId}`, (x, y) => {
        this.virtualElementPosition.x = x;
        this.virtualElementPosition.y = y;
        if (this.virtualTriggerElement === null) {
          this.virtualTriggerElement = {};
          setTimeout(() => {
            this.setPopperTrigger(this.virtualTriggerElement);
          }, 0);
        }
        this.virtualTriggerElement.getBoundingClientRect = () => {
          const { x, y } = this.virtualElementPosition;
          return { width: 0, height: 0, top: y, right: x, bottom: y, left: x };
        };
        this.popper.current?.update();
      }),
    );
  }

  componentWillUnmount() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }

  handleTriggerClick = (e) => {
    const { onClick } = this.asProps;
    const { xIndex, yIndex } = this.state.tooltipProps;

    const index = xIndex ?? yIndex;

    onClick?.(index, e);
  };

  render() {
    const { Children, children, tag, forcedAdvancedMode, onClick: _, ...other } = this.asProps;

    const advancedMode =
      forcedAdvancedMode ||
      !!findComponent(Children, [Tooltip.Trigger.displayName, Tooltip.Popper.displayName]);
    this.renderContext.index = -1;
    this.renderContext.indexKeysCache.clear();
    this.renderContext.patterns = this.asProps.patterns ?? this.state.tooltipProps.patterns;

    return (
      <TooltipDotRenderContext.Provider value={this.renderContext}>
        <Root
          render={Popper}
          visible={this.state.$visible}
          onFirstUpdate={this.handlerCancel}
          onOutsideClick={this.handlerCancel}
          interaction='none'
          explicitTriggerSet
          offset={8}
          flip={{ allowedAutoPlacements: ['left', 'right'] }}
        >
          {({ popper, setTrigger }) => {
            this.setPopperTrigger = setTrigger;
            this.popper = popper;
            this.popper.current?.update();
            return advancedMode
              ? (
                  <Children />
                )
              : (
                  <>
                    {tag && <Tooltip.Trigger tag={tag} onClick={this.handleTriggerClick} />}
                    <Tooltip.Popper {...other}>{children}</Tooltip.Popper>
                  </>
                );
          }}
        </Root>
      </TooltipDotRenderContext.Provider>
    );
  }
}

function PopperTrigger() {
  return <Root render={Popper.Trigger} />;
}

function PopperPopper(props) {
  const { Element: STooltip, styles, $visible, x, y } = props;

  const handlerCancel = React.useCallback(() => false, []);

  if (!$visible) return null;

  return sstyled(styles)(
    <STooltip
      render={Popper.Popper}
      childrenPosition='inside'
      onMouseMove={handlerCancel}
      x={x}
      y={y}
    />,
  );
}
PopperPopper.style = style;

function Title(props) {
  const STitle = Root;
  const { styles } = props;

  return sstyled(styles)(<STitle render={Box} __excludeProps={['data', 'scale']} />);
}
Title.style = style;

function Dot(props) {
  const { styles, color, Children } = props;
  const resolveColor = useColorResolver();
  const renderContext = React.useContext(TooltipDotRenderContext);
  const defaultColor = getChartDefaultColorName(renderContext.index);
  const patterns = props.patterns ?? renderContext.patterns;

  const key = Children;
  if (!renderContext.indexKeysCache.has(key)) {
    renderContext.indexKeysCache.add(key);
    renderContext.index += 1;
  }
  const SDotGroup = Root;
  const SDot = Box;
  const SDotCircle = Box;
  return sstyled(styles)(
    <SDotGroup render={Box} use:color={undefined} __excludeProps={['data', 'scale']}>
      {patterns
        ? (
            <SDot>
              <PatternSymbol
                color={resolveColor(color ?? defaultColor)}
                patternKey={color ?? defaultColor}
              />
            </SDot>
          )
        : (
            <SDot>
              <SDotCircle color={resolveColor(color ?? defaultColor)} />
            </SDot>
          )}
      <Children />
    </SDotGroup>,
  );
}
Dot.style = style;

function Footer(props) {
  const { styles } = props;
  const SFooter = Root;
  return sstyled(styles)(<SFooter render={Box} __excludeProps={['data', 'scale']} />);
}
Footer.style = style;

const Tooltip = createElement(TooltipRoot, {
  Trigger: PopperTrigger,
  Popper: PopperPopper,
  Title,
  Footer,
  Dot,
});

export default Tooltip;
