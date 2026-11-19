import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import type { NSLimits } from '@semcore/ui/limits';
import { LimitsDropdownNotice } from '@semcore/ui/limits';
import Link from '@semcore/ui/link';
import React from 'react';

type Props = Pick<NSLimits.DropdownNotice.Props, 'title' | 'text' | 'locale'> & {
  showSecondaryCta: boolean;
  showTrustLine: boolean;
  trustLineDescription: string;
};

const Demo = (props: Props) => {
  const { title, text, locale, showSecondaryCta, showTrustLine, trustLineDescription } = props;

  return (
    <Box p={3}>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Save</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Download</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
          <LimitsDropdownNotice
            title={title || undefined}
            text={text}
            locale={locale}
            primaryCta={<Button use='primary'>Upgrade to {'{plan}'}</Button>}
            secondaryCta={showSecondaryCta ? <Link size={200}>See plans</Link> : undefined}
            trustLine={showTrustLine ? (trustLineDescription ? { description: trustLineDescription } : true) : undefined}
          />
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Box>
  );
};

export const defaultProps: Props = {
  title: 'Title',
  text: 'Description, refer to the UX Copy page for the guidelines',
  locale: 'en',
  showSecondaryCta: false,
  showTrustLine: false,
  trustLineDescription: '',
};

export default Demo;
