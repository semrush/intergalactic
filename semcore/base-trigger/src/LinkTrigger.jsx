import React from 'react';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import Spin from '@semcore/spin';
import { Box } from '@semcore/flex-box';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';

import style from './style/link-trigger.shadow.css';

class RootLinkTrigger extends Component {
  static displayName = 'LinkTrigger';
  static style = style;
  static defaultProps = {
    size: 'm',
  };
  static enhance = [resolveColorEnhance()];

  getTextProps() {
    const { placeholder, empty } = this.asProps;
    return {
      placeholder,
      empty,
    };
  }

  render() {
    const SLinkTrigger = Root;
    const SLinkAddon = LinkTrigger.Addon;
    const { Children, loading, styles, empty, color: providedColor, resolveColor } = this.asProps;

    const color = resolveColor(providedColor);

    return sstyled(styles)(
      <SLinkTrigger
        render={Box}
        tag='button'
        type='button'
        tabIndex={loading ? -1 : 0}
        use:color={color}
      >
        {addonTextChildren(Children, LinkTrigger.Text, LinkTrigger.Addon, empty)}
        <SLinkAddon>
          {loading ? <Spin size='xs' theme='currentColor' /> : <ChevronDown />}
        </SLinkAddon>
      </SLinkTrigger>,
    );
  }
}

function Text(props) {
  const SText = Root;
  const { children, styles, empty, placeholder } = props;

  return sstyled(styles)(
    /* "use:" prefix was used for backward compatibility (by lsroman) */
    <SText render={Box} display-placeholder={empty}>
      {empty ? placeholder : children}
    </SText>,
  );
}

function Addon(props) {
  const SAddon = Root;
  return sstyled(props.styles)(<SAddon render={Box} />);
}

const LinkTrigger = createComponent(RootLinkTrigger, {
  Text,
  Addon,
});

export default LinkTrigger;
