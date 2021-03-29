import React, { useCallback } from 'react';
import { Component, styled } from '@semcore/core';
import Popper from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import createXYElement from './XYElement';
import { getIndexFromData } from './utils';
import findComponent from '@semcore/utils/lib/findComponent';

import style from './style/tooltip.shadow.css';

class TooltipRoot extends Component {
  static displayName = 'Tooltip';

  static style = style;

  state = {
    xIndex: null,
    yIndex: null,
  };

  popperProps = {
    offset: 8,
    flip: { allowedAutoPlacements: ['left', 'right'] },
  };

  componentDidMount() {
    const {
      eventEmitter,
      scale: [xScale, yScale],
      data,
      x,
      y,
    } = this.asProps;
    this.unsubscribeNearestXY = eventEmitter.subscribe('onNearestXY', ([pX, pY]) => {
      this.setState({
        xIndex: x === undefined || pX === undefined ? null : getIndexFromData(data, xScale, x, pX),
        yIndex: y === undefined || pY === undefined ? null : getIndexFromData(data, yScale, y, pY),
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeNearestXY) {
      this.unsubscribeNearestXY();
    }
  }

  getTriggerProps() {
    const { x, y } = this.asProps;
    return {
      x,
      y,
    };
  }

  getPopperProps() {
    const { data } = this.asProps;
    const { xIndex, yIndex } = this.state;
    return {
      data,
      xIndex,
      yIndex,
    };
  }

  render() {
    const Root = this.Root;
    const { Children, children, tag, ...other } = this.asProps;
    const { xIndex, yIndex } = this.state;

    const visible = (xIndex ?? yIndex) !== null;

    const advanceMode = !!findComponent(Children, [
      Tooltip.Trigger.displayName,
      Tooltip.Popper.displayName,
    ]);
    return (
      <Root render={Popper} visible={visible} {...this.popperProps}>
        {({ popper }) => {
          popper.current?.update();
          return advanceMode ? (
            <Children />
          ) : (
            <>
              <Tooltip.Trigger tag={tag} />
              <Tooltip.Popper {...other}>{children}</Tooltip.Popper>
            </>
          );
        }}
      </Root>
    );
  }
}

function PopperPopper(props) {
  const { Element: STooltip, styles, xIndex, yIndex } = props;

  const handlerCancel = useCallback(() => false, []);

  if ((xIndex ?? yIndex) === null) return null;

  return styled(styles)(
    <STooltip render={Popper.Popper} childrenPosition="inside" onMouseMove={handlerCancel} />,
  );
}

function Title(props) {
  const { Root: STitle, styles } = props;
  return styled(styles)(<STitle render={Box} __excludeProps={['data', 'scale']} />);
}

function Dot(props) {
  const { Root: SDotGroup, styles, color = '#50aef4', Children } = props;
  const SDot = Box;
  return styled(styles)`
    SDot {
      background: ${color};
    }
  `(
    <SDotGroup render={Box}>
      <SDot __excludeProps={['data', 'scale']} />
      <Children />
    </SDotGroup>,
  );
}

function Footer() {
  return null;
}

const Tooltip = createXYElement(TooltipRoot, {
  Trigger: Popper.Trigger,
  Popper: PopperPopper,
  Title,
  Footer,
  Dot,
});

export default Tooltip;
