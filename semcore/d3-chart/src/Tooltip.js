import React, { useCallback } from 'react';
import { bisector } from 'd3-array';
import { Component, Root, sstyled } from '@semcore/core';
import Popper from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import findComponent from '@semcore/utils/lib/findComponent';
import resolveColor from '@semcore/utils/lib/color';

import createXYElement from './XYElement';

import style from './style/tooltip.shadow.css';

class TooltipRoot extends Component {
  static displayName = 'Tooltip';

  static style = style;

  state = {
    xIndex: null,
    yIndex: null,
  };

  componentDidMount() {
    const { eventEmitter, data, x, y } = this.asProps;
    const xBisect = bisector((d) => d[x]).center;
    const yBisect = bisector((d) => d[y]).center;
    this.unsubscribeNearestXY = eventEmitter.subscribe('onNearestXY', ([pX, pY]) => {
      this.setState({
        xIndex: x === undefined || pX === undefined ? null : xBisect(data, pX),
        yIndex: y === undefined || pY === undefined ? null : yBisect(data, pY),
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
    const { Children, children, tag, ...other } = this.asProps;
    const { xIndex, yIndex } = this.state;

    const visible = (xIndex ?? yIndex) !== null;

    const advanceMode = !!findComponent(Children, [
      Tooltip.Trigger.displayName,
      Tooltip.Popper.displayName,
    ]);
    return (
      <Root render={Popper} visible={visible} offset={8}>
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

  return sstyled(styles)(
    <STooltip render={Popper.Popper} childrenPosition="inside" onMouseMove={handlerCancel} />,
  );
}

function Title(props) {
  const STitle = Root;
  const { styles } = props;
  return sstyled(styles)(<STitle render={Box} __excludeProps={['data', 'scale']} />);
}

function Dot(props) {
  const { styles, color = '#50aef4', Children } = props;
  const SDotGroup = Root;
  const SDot = Box;
  return sstyled(styles)(
    <SDotGroup render={Box}>
      <SDot __excludeProps={['data', 'scale']} color={resolveColor(color)} />
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
