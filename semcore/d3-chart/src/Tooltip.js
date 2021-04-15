import React, { useCallback } from 'react';
import { Component, styled } from '@semcore/core';
import Popper from '@semcore/popper';
import { Box } from '@semcore/flex-box';
import findComponent from '@semcore/utils/lib/findComponent';
import { CONSTANT } from './utils';
import createElement from './createElement';

import style from './style/tooltip.shadow.css';

class TooltipRoot extends Component {
  static displayName = 'Tooltip';

  static style = style;

  state = {
    $visible: false,
  };

  handlerCancel = () => false;

  getTriggerProps() {
    // TODO: как то убрать
    const { x, y } = this.asProps;
    return { x, y };
  }

  getPopperProps() {
    return {
      ...this.state,
    };
  }

  componentDidMount() {
    const { eventEmitter, rootRef } = this.asProps;
    this.unsubscribeTooltipVisible = eventEmitter.subscribe(
      'onTooltipVisible',
      (visible, data, node) => {
        this.setState(
          {
            ...data,
            $visible: visible,
          },
          () => {
            if (node && (node[CONSTANT.VIRTUAL_ELEMENT] || rootRef.current.contains(node))) {
              this?.setPopperTrigger(node);
              this.popper.current?.update();
            }
          },
        );
      },
    );
  }

  componentWillUnmount() {
    if (this.unsubscribeTooltipVisible) {
      this.unsubscribeTooltipVisible();
    }
  }

  render() {
    const Root = this.Root;
    const { Children, children, tag, ...other } = this.asProps;

    const advanceMode = !!findComponent(Children, [
      Tooltip.Trigger.displayName,
      Tooltip.Popper.displayName,
    ]);
    return (
      <Root
        render={Popper}
        visible={this.state.$visible}
        onFirstUpdate={this.handlerCancel}
        onOutsideClick={this.handlerCancel}
        interaction="none"
        offset={8}
        flip={{ allowedAutoPlacements: ['left', 'right'] }}
      >
        {({ popper, setTrigger }) => {
          this.setPopperTrigger = setTrigger;
          this.popper = popper;
          this.popper.current?.update();
          return advanceMode ? (
            <Children />
          ) : (
            <>
              {tag && <Tooltip.Trigger tag={tag} />}
              <Tooltip.Popper {...other}>{children}</Tooltip.Popper>
            </>
          );
        }}
      </Root>
    );
  }
}

function PopperPopper(props) {
  const { Element: STooltip, styles, $visible } = props;

  const handlerCancel = useCallback(() => false, []);

  if (!$visible) return null;

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

const Tooltip = createElement(TooltipRoot, {
  Trigger: Popper.Trigger,
  Popper: PopperPopper,
  Title,
  Footer,
  Dot,
});

export default Tooltip;
