import { Component, createComponent, Root, type Intergalactic } from '@semcore/core';
import SemcoreNotice from '@semcore/notice';
import React from 'react';

import type { NSLimitsNotice } from './Notice.type';
import NoticeBase from '../../inner-components/NoticeBase/NoticeBase';
import UsageMeter from '../../inner-components/UsageMeter/UsageMeter';

class NoticeRoot extends Component<Intergalactic.InternalTypings.InferComponentProps<NSLimitsNotice.Component>> {
  static displayName = 'Limits.Notice';

  render() {
    const SNotice = Root;
    const SNoticeClose = SemcoreNotice.Close;

    const { closable = false, onClose, usage, locale } = this.asProps;

    return (
      <SNotice
        render={NoticeBase}
        header={usage && <UsageMeter locale={locale} {...usage} />}
        aside={closable && <SNoticeClose m={0} onClick={onClose} />}
      />
    );
  }
}

const Notice = createComponent<NSLimitsNotice.Component, typeof NoticeRoot>(NoticeRoot);

export default Notice;
