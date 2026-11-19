import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Dropdown from '@semcore/ui/dropdown';
import type { NSLimits } from '@semcore/ui/limits';
import { LimitsDropdownContent } from '@semcore/ui/limits';
import Link from '@semcore/ui/link';
import React from 'react';

type UsageMeterProps = Extract<NSLimits.DropdownContent.Props['usage'], { feature: string }>;

type Props = Pick<NSLimits.DropdownContent.Props, 'title' | 'text' | 'locale'> & {
  showSecondaryCta: boolean;
  showTrustLine: boolean;
  trustLineDescription: string;
  usageVariant: 'none' | 'header' | 'list';
  usageFeature: string;
  usageState: UsageMeterProps['state'];
};

const usageList: UsageMeterProps[] = [
  { feature: 'Title', value: 0, max: 1000 },
  { feature: 'Title', value: 732, max: 1000 },
  { feature: 'Title', value: 872, max: 1000, state: 'warning' },
  { feature: 'Title', value: 1000, max: 1000, state: 'warning' },
];

const Demo = (props: Props) => {
  const {
    title,
    text,
    locale,
    showSecondaryCta,
    showTrustLine,
    trustLineDescription,
    usageVariant,
    usageFeature,
    usageState,
  } = props;

  return (
    <Box p={3}>
      <Dropdown>
        <Dropdown.Trigger id='dropdown-basic' tag={Button}>
          About
        </Dropdown.Trigger>
        <Dropdown.Popper aria-labelledby='dropdown-basic'>
          <LimitsDropdownContent
            title={title}
            text={text}
            locale={locale}
            primaryCta={<Button use='primary'>Start 7-day free trial</Button>}
            secondaryCta={showSecondaryCta ? <Link size={200}>See plans</Link> : undefined}
            trustLine={showTrustLine ? (trustLineDescription ? { description: trustLineDescription } : true) : undefined}
            usage={
              usageVariant === 'header'
                ? { value: 100, max: 100, feature: usageFeature, state: usageState }
                : usageVariant === 'list'
                  ? usageList
                  : undefined
            }
          />
        </Dropdown.Popper>
      </Dropdown>
    </Box>
  );
};

export const defaultProps: Props = {
  title: 'Title',
  text: 'Description, refer to the UX Copy page for the guidelines',
  locale: 'en',
  showSecondaryCta: true,
  showTrustLine: true,
  trustLineDescription: '',
  usageVariant: 'header',
  usageFeature: '[Feature]',
  usageState: 'warning',
};

export default Demo;
