import { Flex, Box } from '@semcore/base-components';
import { Component, createComponent, Root, sstyled, type Intergalactic } from '@semcore/core';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import Divider from '@semcore/divider';
import SemcoreNotice from '@semcore/notice';
import React from 'react';

import style from './NoticeBase.shadow.css';
import type { NSLimitsNoticeBase } from './NoticeBase.type';
import TrustLine from '../TrustLine/TrustLine';

class NoticeBaseRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSLimitsNoticeBase.Component>,
  typeof NoticeBaseRoot.enhance
> {
  static style = style;
  static displayName = 'Limits.NoticeBase';
  static enhance = [uniqueIDEnhancement()] as const;

  render() {
    const SNotice = Root;
    const SNoticeLeading = Box;
    const SNoticeHeader = Box;
    const SNoticeBody = Flex;
    const SNoticeContent = Flex;
    const SNoticeTitle = SemcoreNotice.Title;
    const SNoticeText = SemcoreNotice.Text;
    const SNoticeActions = Flex;
    const SNoticeAside = Box;
    const SNoticeDivider = Divider;

    const {
      title,
      text,
      theme = 'default',
      header,
      leading,
      aside,
      beforeActions,
      primaryCta,
      secondaryCta,
      trustLine,
      locale,
      uid,
      styles,
    } = this.asProps;

    const titleId = `igc-${uid}-title`;
    const hasAside = Boolean(aside);

    return sstyled(styles)(
      <SNotice
        render={SemcoreNotice}
        __excludeProps={['title', 'theme']}
        theme={theme}
        aria-label={undefined}
        aria-labelledby={titleId}
      >
        {leading && <SNoticeLeading>{leading}</SNoticeLeading>}
        <SNoticeContent>
          {header && <SNoticeHeader with-aside={hasAside}>{header}</SNoticeHeader>}
          <SNoticeBody with-aside={hasAside}>
            <SNoticeTitle id={titleId} m={0}>{title}</SNoticeTitle>
            <SNoticeText m={0}>{text}</SNoticeText>
          </SNoticeBody>
          <SNoticeActions>
            {beforeActions}
            {primaryCta}
            {secondaryCta}
            {secondaryCta && trustLine && <SNoticeDivider orientation='vertical' />}
            {trustLine && <TrustLine locale={locale} {...(typeof trustLine === 'object' ? trustLine : {})} />}
          </SNoticeActions>
        </SNoticeContent>
        {hasAside && <SNoticeAside>{aside}</SNoticeAside>}
      </SNotice>,
    );
  }
}

const NoticeBase = createComponent<NSLimitsNoticeBase.Component, typeof NoticeBaseRoot>(NoticeBaseRoot);

export default NoticeBase;
