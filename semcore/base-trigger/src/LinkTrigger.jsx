import { ButtonLink } from '@semcore/button';
import { createComponent, Component, Root } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import { findAllComponents } from '@semcore/core/lib/utils/findComponent';
import ChevronDownL from '@semcore/icon/ChevronDown/l';
import ChevronDownM from '@semcore/icon/ChevronDown/m';
import Spin from '@semcore/spin';
import React from 'react';

class RootLinkTrigger extends Component {
  static displayName = 'LinkTrigger';

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
    const { Children, loading, empty, disabled, size } = this.asProps;

    return (
      <SLinkTrigger
        render={ButtonLink}
        use:disabled={disabled || loading}
      >
        {addonTextChildren(Children, LinkTrigger.Text, LinkTrigger.Addon, empty)}
        <SLinkAddon>
          {loading
            ? <Spin size={size >= 600 ? 's' : 'xs'} theme='currentColor' />
            : size >= 600 ? <ChevronDownL /> : <ChevronDownM />}
        </SLinkAddon>
      </SLinkTrigger>
    );
  }
}

/**
 * LinkTrigger
 *
 * {@link https://developer.semrush.com/intergalactic/components/base-trigger/base-trigger-api#linktrigger|API} | {@link https://developer.semrush.com/intergalactic/components/base-trigger/base-trigger-code#linktrigger|Examples}
 */
const LinkTrigger = createComponent(RootLinkTrigger, {
  Text: ButtonLink.Text,
  Addon: ButtonLink.Addon,
}, {
  parent: ButtonLink,
});

export default LinkTrigger;
