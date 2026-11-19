import { Flex } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled, type Intergalactic } from '@semcore/core';
import { Text } from '@semcore/typography';
import React from 'react';

import style from './dropdown-notice.shadow.css';
import type { NSLimitsDropdownNotice } from './DropdownNotice.type';
import TrustLine from '../../../inner-components/TrustLine/TrustLine';

class DropdownNoticeRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSLimitsDropdownNotice.Component>
> {
  static style = style;
  static displayName = 'Limits.DropdownNotice';

  render() {
    const SDropdownNotice = Root;
    const SDropdownNoticeBody = Flex;
    const SDropdownNoticeTitle = Text;
    const SDropdownNoticeText = Text;
    const SDropdownNoticeFooter = Flex;
    const SDropdownNoticeActions = Flex;

    const { title, text, primaryCta, secondaryCta, trustLine, locale, styles } = this.asProps;

    return sstyled(styles)(
      <SDropdownNotice render={Flex} __excludeProps={['title']}>
        <SDropdownNoticeBody>
          {title && (
            <SDropdownNoticeTitle tag='div' size={300} fontWeight='bold'>
              {title}
            </SDropdownNoticeTitle>
          )}
          <SDropdownNoticeText tag='div' size={200}>
            {text}
          </SDropdownNoticeText>
        </SDropdownNoticeBody>
        <SDropdownNoticeFooter>
          <SDropdownNoticeActions>
            {primaryCta}
            {secondaryCta}
          </SDropdownNoticeActions>
          {trustLine && <TrustLine locale={locale} {...(typeof trustLine === 'object' ? trustLine : {})} />}
        </SDropdownNoticeFooter>
      </SDropdownNotice>,
    );
  }
}

const DropdownNotice = createComponent<
  NSLimitsDropdownNotice.Component,
  typeof DropdownNoticeRoot
>(DropdownNoticeRoot);

export default DropdownNotice;
