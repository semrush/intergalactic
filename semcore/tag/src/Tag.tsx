import React, { HTMLAttributes, SVGAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import resolveColor, { opacity } from '@semcore/utils/lib/color';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import { IIconProps } from '@semcore/icon';
import CloseXS from '@semcore/icon/lib/Close/xs';
import CloseXXS from '@semcore/icon/lib/Close/xxs';

import style from './style/tag.shadow.css';

function isCustomTheme(use, theme) {
  const type = {
    primary: ['invert', 'warning'],
    secondary: ['muted', 'invert'],
  };
  return type[use] ? !type[use].includes(theme) : true;
}

export type TagSize = 'xl' | 'l' | 'm' | 's';
export type TagTheme = 'muted' | 'invert' | 'warning' | string;
export type TagUse = 'primary' | 'secondary';

export interface ITagProps extends IBoxProps {
  /** Value responsible for tag availability
   */
  disabled?: boolean;
  /** Value responsible for tag activity
   */
  active?: boolean;
  /** Interactive tag
   */
  interactive?: boolean;
  /** Tag type
   * @default secondary
   */
  use?: TagUse;
  /** Tag theme, there are several default themes or you can use your color
   * @default muted
   */
  theme?: TagTheme;
  /** Tag size
   * @default m
   */
  size?: TagSize;
  /** Left addon tag */
  addonLeft?: React.ElementType;
  /** Right addon tag */
  addonRight?: React.ElementType;
}

export interface ITagCloseProps extends IIconProps {
  /** Tag type
   * @default secondary
   */
  use?: TagUse;
  /** Tag theme, there are several default themes or you can use your color
   * @default muted
   */
  theme?: TagTheme;
  /** Tag size
   * @default m
   */
  size?: TagSize;
}

export interface ITagContext extends ITagProps {
  getCloseProps?: PropGetter<RootTag['getCloseProps']>;
}

export interface ITagAddonProps extends IBoxProps {}

export interface ITagTextProps extends IBoxProps {}

class RootTag extends Component<ITagProps> {
  static displayName = 'Tag';
  static style = style;
  static defaultProps = {
    use: 'secondary',
    theme: 'muted',
    size: 'm',
  };

  getCloseProps() {
    const { use, theme, size } = this.asProps;
    return { use, theme, size };
  }

  render() {
    const STag = this.Root;
    let {
      Children,
      styles,
      size,
      theme,
      use,
      interactive,
      disabled,
      active,
      addonLeft,
      addonRight,
    } = this.asProps;

    if (disabled) {
      interactive = false;
    }
    /* hack */
    if (use === 'primary' && theme === 'muted') {
      theme = 'asphalt';
    }

    const color = theme ? resolveColor(theme) : '';

    return styled(styles)`
      STag[theme='custom'] {
        color: ${color};
        background-color: ${opacity(color, 0.15)};
        &[active] {
          color: #fff;
          background-color: ${color};
        }
        &[interactive] {
          &:hover {
            color: #fff;
            background-color: ${color};
          }
          &:active {
            color: #fff;
            background-color: ${color};
          }
        }
      }
    `(
      <STag
        render={Box}
        size={size}
        active={active}
        disabled={disabled}
        interactive={interactive}
        theme={isCustomTheme(use, theme) ? 'custom' : `${use}-${theme}`}
      >
        {addonLeft ? <Tag.Addon tag={addonLeft} /> : null}
        {addonTextChildren(Children, Tag.Text, Tag.Addon)}
        {addonRight ? <Tag.Addon tag={addonRight} /> : null}
      </STag>,
    );
  }
}

function Text(props: IFunctionProps<ITagTextProps>) {
  const { Root: SText, styles } = props;
  return styled(styles)(<SText render={Box} tag="span" />);
}

function Close(props: IFunctionProps<ITagCloseProps>) {
  const { Root: SClose, styles, use, theme, size } = props;

  return styled(styles)`
    SClose[theme] {
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  `(
    <SClose
      render={Box}
      theme={isCustomTheme(use, theme)}
      tag={size === 'xl' ? CloseXS : CloseXXS}
    />,
  );
}

function Addon(props: IFunctionProps<ITagAddonProps>) {
  const { Root: SAddon, styles } = props;
  return styled(styles)(<SAddon render={Box} tag="span" />);
}

function Circle(props: IFunctionProps<ITagAddonProps>) {
  const { Root: SCircle, styles } = props;
  return styled(styles)(<SCircle render={Box} tag="span" />);
}

const Tag = createComponent<
  Merge<ITagProps, HTMLAttributes<HTMLDivElement>>,
  {
    Text: Merge<ITagTextProps, HTMLAttributes<HTMLSpanElement>>;
    Addon: Merge<ITagAddonProps, HTMLAttributes<HTMLSpanElement>>;
    Close: Merge<ITagCloseProps, SVGAttributes<SVGElement>>;
    Circle: Merge<ITagAddonProps, HTMLAttributes<HTMLSpanElement>>;
  },
  ITagContext
>(RootTag, {
  Text,
  Addon,
  Close,
  Circle,
});

export default Tag;
