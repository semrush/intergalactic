import type { Intergalactic } from '@semcore/core';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import MailSent from '@semcore/illustration/MailSent';
import { Flex } from '@semcore/ui/base-components';
import { ButtonFH, NoticeFH } from '@semcore/ui/feature-highlight';
import type { NSNotice } from '@semcore/ui/notice';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type NoticeFHAdvancedProps = Intergalactic.InternalTypings.EfficientOmit<NSNotice.Props, 'icon' | 'illustration'> & {
  noticeText?: string;
  showTitle?: boolean;
  titleText?: string;
  showActions?: boolean;
  actionButtonText?: string;
  closable?: boolean;
  showIcon?: boolean;
  iconType?: 'ai' | 'mail';
  ariaLabel?: string;
};

const Demo = (props: NoticeFHAdvancedProps) => {
  const {
    noticeText = 'We have a new feature!',
    showTitle = false,
    titleText = 'Optimize your domain for AI search',
    showActions = false,
    actionButtonText = 'Optimize for AI search',
    closable = true,
    showIcon = true,
    iconType = 'ai',
    ariaLabel = 'Highlighted notice',
  } = props;

  const icon = showIcon ? (iconType === 'ai' ? <SummaryAI /> : <MailSent />) : undefined;

  return (
    <Flex gap={4} direction='column'>
      <NoticeFH
        closable={closable}
        aria-label={ariaLabel}
        label={icon}
        title={showTitle ? <Text>{titleText}</Text> : undefined}
        actions={showActions ? <ButtonFH use='primary'>{actionButtonText}</ButtonFH> : undefined}
        text={noticeText}
      />
    </Flex>
  );
};

export const defaultProps: NoticeFHAdvancedProps = {
  noticeText: 'We have a new feature!',
  showTitle: false,
  titleText: 'Optimize your domain for AI search',
  showActions: false,
  actionButtonText: 'Optimize for AI search',
  closable: true,
  showIcon: true,
  iconType: 'ai',
  ariaLabel: 'Highlighted notice',
};

Demo.defaultProps = defaultProps;

export default Demo;
