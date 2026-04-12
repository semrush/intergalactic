import { ButtonLink } from '@semcore/button';
import { createComponent, Component, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import { findAllComponents } from '@semcore/core/lib/utils/findComponent';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import Spin from '@semcore/spin';
import React from 'react';

class RootLinkTrigger extends Component {
  static displayName = 'LinkTrigger';

  getTextProps(props) {
    const { placeholder, empty, Children } = this.asProps;
    const content = empty ? placeholder : props.children;
    const addons = findAllComponents(Children, [LinkTrigger.Addon.displayName]);

    return {
      'use:children': content,
      empty,
      'w': `calc(100% - ${20 * (addons.length + 1)}px)`, // 20px is for the ChevronDown (16px) and marginLeft (4px) * addons - for addons count
    };
  }

  render() {
    const SLinkTrigger = Root;
    const SLinkAddon = LinkTrigger.Addon;
    const { Children, loading, empty, disabled } = this.asProps;

    return (
      <SLinkTrigger
        render={ButtonLink}
        use:disabled={disabled || loading}
      >
        {addonTextChildren(Children, LinkTrigger.Text, LinkTrigger.Addon, empty)}
        <SLinkAddon>
          {loading ? <Spin size='xs' theme='currentColor' /> : <ChevronDown />}
        </SLinkAddon>
      </SLinkTrigger>
    );
  }
}

const LinkTrigger = createComponent(RootLinkTrigger, {
  Text: ButtonLink.Text,
  Addon: ButtonLink.Addon,
}, {
  parent: ButtonLink,
});

export default LinkTrigger;
