import { Component, createComponent, Root } from '@semcore/core';
import SemcoreNotice from '@semcore/notice';
import React from 'react';

import type { NSLimitsNotice } from './Notice.type';
import NoticeBase from '../../inner-components/NoticeBase/NoticeBase';
import UsageMeter from '../../inner-components/UsageMeter/UsageMeter';

class NoticeRoot extends Component<NSLimitsNotice.Props, [], never, {}, {}, NSLimitsNotice.DefaultProps> {
  static displayName = 'Limits.Notice';

  static defaultProps = {
    theme: 'default',
  } as const;

  render() {
    const SNotice = Root;
    const SNoticeClose = SemcoreNotice.Close;

    const { closable = false, onClose, usage, locale, theme } = this.asProps;

    return (
      <SNotice
        render={NoticeBase}
        header={usage && <UsageMeter locale={locale} {...usage} withMeterIndicator={theme === 'default'} />}
        aside={closable && <SNoticeClose m={0} onClick={onClose} />}
      />
    );
  }
}

const Notice = createComponent<NSLimitsNotice.Component, typeof NoticeRoot>(NoticeRoot);

export default Notice;
