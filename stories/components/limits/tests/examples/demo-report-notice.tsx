import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import type { NSLimits } from '@semcore/ui/limits';
import { LimitsDemoReportNotice } from '@semcore/ui/limits';
import Link from '@semcore/ui/link';
import React from 'react';

type Props = Pick<NSLimits.DemoReportNotice.Props, 'title' | 'text' | 'backLabel' | 'locale'> & {
  showSecondaryCta: boolean;
  showTrustLine: boolean;
  showBeforeActions: boolean;
};

const Demo = (props: Props) => {
  const { title, text, backLabel, locale, showSecondaryCta, showTrustLine, showBeforeActions } = props;

  return (
    <Box p={3}>
      <LimitsDemoReportNotice
        title={title}
        text={text}
        backLabel={backLabel || undefined}
        locale={locale}
        primaryCta={<Button use='primary'>Start free 7-day trial</Button>}
        secondaryCta={showSecondaryCta ? <Link>View pricing</Link> : undefined}
        trustLine={showTrustLine || undefined}
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
  );
};

export const defaultProps: Props = {
  title: 'You are viewing a live demo',
  text: 'Description, refer to the UX Copy page for the guidelines',
  backLabel: '',
  locale: 'en',
  showSecondaryCta: false,
  showTrustLine: false,
  showBeforeActions: false,
};

export default Demo;
