import React, { ComponentProps } from 'react';
import createComponent, { Component, styled, Merge } from '@semcore/core';
import Popper, { IPopperProps, IPopperContext } from '@semcore/popper';
import capitalizeFirstLetter from '@semcore/utils/lib/capitalizeFirstLetter';
import logger from '@semcore/utils/lib/logger';

import style from './style/dropdown.shadow.css';

export interface IDropdownProps extends IPopperProps {
  /**
   * Modifier responsible for the size of the pop-up window
   * `fixed` - a pop-up window of the same size as trigger
   * `min` - pop-up window not less than the size of the trigger
   * `false` - the pop-up window depends on the content within it
   * @default 'min'
   * */
  stretch?: 'min' | 'fixed' | false;

  /**
   * @deprecated {@link IDropdownProps.stretch}
   * */
  popperStretch?: 'min' | 'fixed' | false;
}
export interface IDropdownContext extends IPopperContext {}

class Dropdown extends Component<IDropdownProps> {
  static displayName = 'Dropdown';
  static style = style;
  static defaultProps = {
    // timeout: [100, 50],
    placement: 'bottom-start',
    offset: [0, 4],
    stretch: 'min',
  };

  defaultModifiers = [
    {
      name: 'flip',
      enabled: false,
    },
    {
      name: 'stretch',
      phase: 'beforeRead',
      enabled: true,
      fn: function ({ state, options }) {
        const [position] = state.placement.split('-');

        const isVertical = ['left', 'right'].indexOf(position) !== -1;
        const len = isVertical ? 'height' : 'width';
        const referenceLen = state.elements.reference[`offset${capitalizeFirstLetter(len)}`];

        if (options.stretch === 'min') {
          state.rects.popper.width = Math.max(state.rects.popper.width, referenceLen);
          state.elements.popper.style[`min${capitalizeFirstLetter(len)}`] = `${referenceLen}px`;
        }

        if (options.stretch === 'fixed') {
          state.rects.popper.width = referenceLen;
          state.elements.popper.style[len] = `${referenceLen}px`;
        }
      },
    },
  ];

  render() {
    let { Children, forwardRef, modifiers = [], stretch, popperStretch, ...other } = this.asProps;

    logger.warn(
      popperStretch !== undefined,
      "The 'popperStretch' property is deprecated, use 'stretch'",
      other['data-ui-name'] || Dropdown.displayName,
    );

    if (popperStretch !== undefined) {
      stretch = popperStretch;
    }

    return (
      <Popper
        ref={forwardRef}
        // @ts-ignore
        modifiers={[
          ...this.defaultModifiers,
          {
            name: 'stretch',
            // @ts-ignore
            options: typeof stretch === 'object' ? stretch : { stretch },
          },
          ...modifiers,
        ]}
        {...other}
      >
        <Children />
      </Popper>
    );
  }
}

function DropdownPopper(props) {
  const { Root: SDropdownPopper, styles } = props;

  return styled(styles)(<SDropdownPopper render={Popper.Popper} />);
}

export default createComponent<
  IDropdownProps,
  {
    Trigger: ComponentProps<typeof Popper.Trigger>;
    Popper: ComponentProps<typeof Popper.Popper>;
  },
  Merge<IDropdownContext, IDropdownProps>
>(
  Dropdown,
  {
    Trigger: Popper.Trigger,
    Popper: DropdownPopper,
  },
  {
    parent: Popper,
  },
);
