import { ButtonLink } from '@semcore/button';
import { createComponent, Component, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import Spin from '@semcore/spin';
import React from 'react';

class RootLinkTrigger extends Component {
  static displayName = 'LinkTrigger';
  static defaultProps = {
    size: 'm',
  };

  getTextProps(props) {
    const { placeholder, empty } = this.asProps;
    const content = empty ? placeholder : props.children;

    return {
      'use:children': content,
      empty,
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
