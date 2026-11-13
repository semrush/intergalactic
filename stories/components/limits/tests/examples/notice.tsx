import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { NSLimits, NSLimitsUsageMeter } from '@semcore/ui/limits';
import { LimitsNotice } from '@semcore/ui/limits';
import Link from '@semcore/ui/link';
import React from 'react';

type Props = Pick<NSLimits.Notice.Props, 'title' | 'text' | 'theme' | 'closable' | 'locale'> & {
  showSecondaryCta: boolean;
  showTrustLine: boolean;
  trustLineDescription: string;
  showUsage: boolean;
  usageValue: number;
  usageFeature: string;
  usageState: NSLimitsUsageMeter.Props['state'];
};

const Demo = (props: Props) => {
  const {
    title,
    text,
    theme,
    closable,
    locale,
    showSecondaryCta,
    showTrustLine,
    trustLineDescription,
    showUsage,
    usageValue,
    usageFeature,
    usageState,
  } = props;

  return (
    <Box p={3}>
      <LimitsNotice
        title={title}
        text={text}
        theme={theme}
        locale={locale}
        primaryCta={<Button use='primary'>Start free 7-day trial</Button>}
        secondaryCta={showSecondaryCta ? <Link>View demo</Link> : undefined}
        trustLine={showTrustLine ? (trustLineDescription ? { description: trustLineDescription } : true) : undefined}
        usage={showUsage ? { value: usageValue, feature: usageFeature, state: usageState } : undefined}
        closable={closable}
        onClose={console.log}
      />
    </Box>
  );
};

export const defaultProps: Props = {
  title: 'Title',
  text: 'Description, refer to the UX Copy page for the guidelines',
  theme: 'default',
  closable: true,
  locale: 'en',
  showSecondaryCta: true,
  showTrustLine: true,
  trustLineDescription: 'Test description',
  showUsage: true,
  usageValue: 75,
  usageFeature: 'Audit',
  usageState: 'warning',
};

export default Demo;
