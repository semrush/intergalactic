import { Box } from '@semcore/base-components';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import addonTextChildren from '@semcore/core/lib/utils/addonTextChildren';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import ChevronDown from '@semcore/icon/ChevronDown/m';
import Spin from '@semcore/spin';
import { Text as TextKit } from '@semcore/typography';
import React from 'react';

import style from './style/link-trigger.shadow.css';

class RootLinkTrigger extends Component {
  static displayName = 'LinkTrigger';
  static style = style;
  static defaultProps = {
    size: 'm',
  };

  static enhance = [resolveColorEnhance()];

  triggerRef = React.createRef();

  getTextProps() {
    const { placeholder, empty } = this.asProps;
    return {
      placeholder,
      empty,
      triggerRef: this.triggerRef,
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
        ref={this.triggerRef}
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
  const textRef = React.useRef();
  const { children, styles, empty, placeholder, triggerRef, ellipsis = false } = props;
  const content = empty ? placeholder : children;

  return sstyled(styles)(
    <>
      <SText
        render={TextKit}
        display-placeholder={empty}
        ref={textRef}
        ellipsis={ellipsis}
        hint:triggerRef={triggerRef}
      >
        {content}
      </SText>
    </>,
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
