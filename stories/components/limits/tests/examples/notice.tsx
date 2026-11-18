import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { NSLimits } from '@semcore/ui/limits';
import { LimitsNotice } from '@semcore/ui/limits';
import Link from '@semcore/ui/link';
import React from 'react';

type UsageProps = NonNullable<NSLimits.Notice.Props['usage']>;

type Props = Pick<NSLimits.Notice.Props, 'title' | 'text' | 'theme' | 'closable' | 'locale'> & {
  secondaryCta: 'none' | 'link' | 'button';
  showTrustLine: boolean;
  trustLineDescription: string;
  showUsage: boolean;
  usageMin?: number;
  usageMax?: number;
  usageValue: number;
  usageFeature: string;
  usageState: UsageProps['state'];
  usageTheme?: UsageProps['theme'];
  usageLocale?: string;
  w?: number;
};

const Demo = (props: Props) => {
  const {
    title,
    text,
    theme,
    closable,
    locale,
    secondaryCta,
    showTrustLine,
    trustLineDescription,
    showUsage,
    usageMin,
    usageMax,
    usageValue,
    usageFeature,
    usageState,
    usageTheme,
    usageLocale,
    w,
  } = props;

  return (
    <Box p={3}>
      <Box w={w}>
        <LimitsNotice
          title={title}
          text={text}
          theme={theme}
          locale={locale}
          primaryCta={<Button use='primary'>Start free 7-day trial</Button>}
          secondaryCta={secondaryCta === 'button'
            ? <Button use='secondary'>View sample</Button>
            : secondaryCta === 'link' ? <Link>View demo</Link> : undefined}
          trustLine={showTrustLine ? (trustLineDescription ? { description: trustLineDescription } : true) : undefined}
          usage={showUsage
            ? {
                min: usageMin,
                max: usageMax,
                value: usageValue,
                feature: usageFeature,
                state: usageState,
                theme: usageTheme,
                ...(usageLocale && { locale: usageLocale }),
              }
            : undefined}
          closable={closable}
          onClose={console.log}
        />
      </Box>
    </Box>
  );
};

export const defaultProps: Props = {
  title: 'Title',
  text: 'Description, refer to the UX Copy page for the guidelines',
  theme: 'default',
  closable: true,
  locale: 'en',
  secondaryCta: 'link',
  showTrustLine: true,
  trustLineDescription: 'Test description',
  showUsage: true,
  usageMin: undefined,
  usageMax: undefined,
  usageValue: 75,
  usageFeature: 'Audit',
  usageState: 'warning',
  usageTheme: undefined,
  usageLocale: undefined,
  w: undefined,
};

export default Demo;
