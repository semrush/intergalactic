import InfoM from '@semcore/icon/Info/m';
import QuestionM from '@semcore/icon/Question/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import Coffee from '@semcore/illustration/Coffee';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { NoticeSmart } from '@semcore/ui/notice';
import type { NSNoticeSmart } from '@semcore/ui/notice';
import React from 'react';

type Media = 'none' | 'icon' | 'illustration';
type IconName = 'Info' | 'ThumbUp' | 'Question';

type ExampleProps = Omit<NSNoticeSmart.Props, 'icon' | 'illustration' | 'actions'> & {
  /** icon and illustration are mutually exclusive, so one control drives both */
  media: Media;
  icon: IconName;
  withActions: boolean;
};

const ICONS = { Info: InfoM, ThumbUp: ThumbUpM, Question: QuestionM };

const mediaProps = (media: Media, iconName: IconName) => {
  if (media === 'icon') {
    const Icon = ICONS[iconName];

    return { icon: <Icon /> };
  }

  if (media === 'illustration') {
    return { illustration: <Coffee width='72' height='72' /> };
  }

  return {};
};

const Demo = (props: ExampleProps) => {
  const { media, icon, withActions, theme, title, text, closable, hidden, duration, locale, w } = props;
  const [closed, setClosed] = React.useState(false);

  React.useEffect(() => setClosed(false), [closable, hidden, media, theme]);

  return (
    <Flex direction='column' m={4} w='100%'>
      <NoticeSmart
        {...mediaProps(media, icon) as NSNoticeSmart.Props}
        theme={theme}
        aria-label='Configurable notice'
        data-testid='smart-configurable'
        closable={closable}
        hidden={hidden || closed}
        onClose={() => setClosed(true)}
        w={w}
        title={title || undefined}
        text={text || undefined}
        actions={withActions
          ? (
              <>
                <Button use='primary'>Learn more</Button>
                <Button>Dismiss</Button>
              </>
            )
          : undefined}
        {...(duration === undefined ? {} : { duration })}
        {...(locale === undefined ? {} : { locale })}
      />
    </Flex>
  );
};

export const defaultNoticeSmartProps: ExampleProps = {
  theme: 'info',
  media: 'icon',
  icon: 'Info',
  withActions: true,
  closable: true,
  hidden: false,
  title: 'New tool was launched',
  text: 'Hi there! A cool new tool was launched. Take a look at what it can do for your reports.',
};

Demo.defaultProps = defaultNoticeSmartProps;
export default Demo;
