import React, { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import createComponent, { Component, IFunctionProps, Merge, styled } from '@semcore/core';
import { ITextProps, Text } from '@semcore/typography';
import { Box, IBoxProps } from '@semcore/flex-box';
import keyboardFocusEnhance, {
  IKeyboardFocusProps,
} from '@semcore/utils/lib/enhances/keyboardFocusEnhance';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import resolveColor, { shade } from '@semcore/utils/lib/color';

import style from './style/link.shadow.css';

export interface ILinkProps extends ITextProps, IKeyboardFocusProps {
  /**
   * CSS property of the display link (inline|inline-block)
   * @default false
   */
  inline?: boolean;
  /**
   * Sets the link to the disabled state
   */
  disabled?: boolean;
  /**
   * Sets the link to the active state
   */
  active?: boolean;
  /** This flag enables highlighting of the visited link
   */
  enableVisited?: boolean;
  /** The text will not be moved to a new line
   * @default true
   */
  noWrap?: boolean;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
}

class RootLink extends Component<ILinkProps> {
  static displayName = 'Link';
  static defaultProps = {
    noWrap: true,
  };
  static style = style;
  static enhance = [keyboardFocusEnhance()];

  render() {
    const SLink = Text;
    const {
      Children,
      forwardRef,
      styles,
      keyboardFocused,
      noWrap,
      inline,
      disabled,
      active,
      enableVisited,
      addonLeft,
      addonRight,
      color: colorProps,
      ...other
    } = this.asProps;
    const color = resolveColor(colorProps);

    return styled(styles)`
      SLink[color] {
        color: ${color};

        &:hover {
          color: ${shade(color, -0.12)};
        }
      }
    `(
      <SLink
        tag="a"
        ref={forwardRef}
        color={color}
        inline={inline}
        noWrapText={noWrap}
        enableVisited={enableVisited}
        active={active}
        keyboardFocused={keyboardFocused}
        disabled={disabled}
        {...other}
      >
        {addonLeft ? <Link.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Link.Text, Link.Addon)}
        {addonRight ? <Link.Addon tag={addonRight} /> : null}
      </SLink>,
    );
  }
}

function LinkText(props: IFunctionProps<IBoxProps>) {
  const { styles, Root: SText } = props;
  return styled(styles)(<SText render={Box} tag="span" />);
}

function Addon(props: IFunctionProps<IBoxProps>) {
  const { styles, Root: SAddon } = props;
  return styled(styles)(<SAddon render={Box} />);
}

const Link = createComponent<
  Merge<ILinkProps, AnchorHTMLAttributes<HTMLAnchorElement>>,
  {
    Text: Merge<IBoxProps, HTMLAttributes<HTMLSpanElement>>;
    Addon: Merge<IBoxProps, HTMLAttributes<HTMLSpanElement>>;
  }
>(RootLink, {
  Text: LinkText,
  Addon,
});

export default Link;
