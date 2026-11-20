import Button from '@semcore/button';
import { Component, createComponent, Root, type Intergalactic, sstyled } from '@semcore/core';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import UndoM from '@semcore/icon/Undo/m';
import React from 'react';

import style from './DemoReportNotice.shadow.css';
import type { NSLimitsDemoReportNotice } from './DemoReportNotice.type';
import NoticeBase from '../../inner-components/NoticeBase/NoticeBase';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

class DemoReportNoticeRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSLimitsDemoReportNotice.Component>,
  typeof DemoReportNoticeRoot.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  typeof DemoReportNoticeRoot.defaultProps
> {
  static style = style;
  static displayName = 'Limits.ReportNotice';
  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  } as const;

  render() {
    const SReportNotice = Root;
    const SBackButton = Button;

    const { onBack, backLabel, getI18nText, styles } = this.asProps;

    return sstyled(styles)(
      <SReportNotice
        render={NoticeBase}
        theme='accent'
        leading={(
          <SBackButton
            use='tertiary'
            theme='muted'
            addonLeft={UndoM}
            aria-label={backLabel ?? getI18nText('back')}
            onClick={onBack}
          />
        )}
      />,
    );
  }
}

const DemoReportNotice = createComponent<
  NSLimitsDemoReportNotice.Component,
  typeof DemoReportNoticeRoot
>(DemoReportNoticeRoot);

export default DemoReportNotice;
