import React, { ComponentProps, HTMLAttributes } from 'react';
import createComponent, {
  Component,
  IFunctionProps,
  Merge,
  PropGetter,
  styled,
} from '@semcore/core';
import addonTextChildren from '@semcore/utils/lib/addonTextChildren';
import ChevronDownXS from '@semcore/icon/lib/ChevronDown/xs';
import BaseTrigger, { IBaseTriggerProps } from './BaseTrigger';
import Spin from '@semcore/spin';
import { Box } from '@semcore/flex-box';
import resolveColor, { shade } from '@semcore/utils/lib/color';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

import style from './style/link-trigger.shadow.css';

export interface ILinkTriggerProps extends Omit<IBaseTriggerProps, 'theme'> {
  /** Sets the loading state */
  loading?: boolean;
  /** Text color */
  color?: string;
}

export interface ILinkTriggerContext extends IBaseTriggerProps {
  getTextProps: PropGetter<RootLinkTrigger['getTextProps']>;
  getAddonProps: PropGetter<() => {}>;
}

class RootLinkTrigger extends Component<ILinkTriggerProps> {
  static displayName = 'LinkTrigger';
  static style = style;
  static defaultProps = {
    size: 'm',
  };
  static enhance = [keyboardFocusEnhance()];

  getTextProps() {
    const { placeholder, empty } = this.asProps;
    return {
      placeholder,
      empty,
    };
  }

  render() {
    const { Root: SLinkTrigger } = this;
    const SLinkAddon = LinkTrigger.Addon;
    const {
      Children,
      loading,
      styles,
      size,
      active,
      disabled,
      keyboardFocused,
      color: colorProps,
    } = this.asProps;
    const color = resolveColor(colorProps);

    return styled(styles)`
      SLinkTrigger[color] {
        color: ${color};

        &:hover {
          color: ${shade(color, -0.12)};
        }
      }
    `(
      <SLinkTrigger
        render={Box}
        active={active}
        color={colorProps}
        size={size}
        disabled={disabled}
        keyboardFocused={keyboardFocused}
      >
        {addonTextChildren(Children, LinkTrigger.Text, LinkTrigger.Addon)}
        <SLinkAddon>
          {loading ? <Spin size="xs" theme="currentColor" /> : <ChevronDownXS />}
        </SLinkAddon>
      </SLinkTrigger>,
    );
  }
}

function Text(props: IFunctionProps<ReturnType<RootLinkTrigger['getTextProps']>>) {
  const { Root: SText, Children, styles, empty, placeholder } = props;

  return styled(styles)(
    <SText render={Box} placeholder={empty}>
      {empty ? placeholder : <Children />}
    </SText>,
  );
}

function Addon(props) {
  const { Root: SAddon, styles } = props;
  return styled(styles)(<SAddon render={Box} />);
}

const LinkTrigger = createComponent<
  Merge<ILinkTriggerProps, HTMLAttributes<HTMLDivElement>>,
  {
    Text: ComponentProps<typeof BaseTrigger.Text>;
    Addon: ComponentProps<typeof BaseTrigger.Addon>;
  },
  ILinkTriggerContext
>(RootLinkTrigger, {
  Text,
  Addon,
});

export default LinkTrigger;
