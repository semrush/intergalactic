import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import type { NSLimits } from '@semcore/ui/limits';
import { LimitsDemoReportNotice } from '@semcore/ui/limits';
import Link from '@semcore/ui/link';
import React from 'react';

type Props = Pick<NSLimits.DemoReportNotice.Props, 'title' | 'text' | 'backLabel' | 'locale'> & {
  secondaryCta: 'none' | 'link' | 'button';
  showTrustLine: boolean;
  trustLineDescription: string;
  showBeforeActions: boolean;
  w?: number;
};

const Demo = (props: Props) => {
  const { title, text, backLabel, locale, secondaryCta, showTrustLine, trustLineDescription, showBeforeActions, w } = props;

  return (
    <Box p={3}>
      <Box w={w}>
        <LimitsDemoReportNotice
          title={title}
          text={text}
          backLabel={backLabel || undefined}
          locale={locale}
          primaryCta={<Button use='primary'>Start free 7-day trial</Button>}
          secondaryCta={secondaryCta === 'button'
            ? <Button use='secondary'>View demo</Button>
            : secondaryCta === 'link' ? <Link>See plans</Link> : undefined}
          trustLine={showTrustLine ? (trustLineDescription ? { description: trustLineDescription } : true) : undefined}
          beforeActions={showBeforeActions
            ? (
                <Input w={300}>
                  <Input.Value placeholder='Enter domain' aria-label='Domain' />
                </Input>
              )
            : undefined}
          onBack={console.log}
        />
      </Box>
    </Box>
  );
};

export const defaultProps: Props = {
  title: 'You are viewing a live demo',
  text: 'Description, refer to the UX Copy page for the guidelines',
  backLabel: '',
  locale: 'en',
  secondaryCta: 'none',
  showTrustLine: false,
  trustLineDescription: '',
  showBeforeActions: false,
  w: undefined,
};

export default Demo;
