import FileExportM from '@semcore/icon/FileExport/m';
import { Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import Link from '@semcore/ui/link';
import Tooltip, { DescriptionTooltip, Hint } from '@semcore/ui/tooltip';
import type { TooltipProps, TooltipHintProps, DescriptionTooltipProps } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ConfigurableTooltipProps = {
  // Tooltip props
  tooltipTitle?: React.ReactNode;
  tooltipTheme?: TooltipProps['theme'];
  tooltipInteraction?: TooltipProps['interaction'];
  tooltipPlacement?: TooltipProps['placement'];
  tooltipTimeout?: TooltipProps['timeout'];

  // Hint props
  hintTitle?: string;
  hintTheme?: TooltipHintProps['theme'];

  // DescriptionTooltip props
  descriptionTheme?: DescriptionTooltipProps['theme'];
  descriptionInteraction?: DescriptionTooltipProps['interaction'];
};

const Demo = (props: ConfigurableTooltipProps) => {
  const {
    tooltipTitle = 'Default tooltip contains short text explaining something about the trigger.',
    tooltipTheme = 'default',
    tooltipInteraction = 'hover',
    tooltipPlacement = 'top',
    tooltipTimeout,
    hintTitle = 'Export to PDF',
    hintTheme = 'default',
    descriptionTheme = 'default',
    descriptionInteraction = 'click',
  } = props;

  return (
    <Flex gap={4} direction='column'>
      <Flex gap={4} alignItems='center'>
        Tooltip:
        <Tooltip
          tag={Link}
          href='#'
          title={tooltipTitle}
          theme={tooltipTheme}
          interaction={tooltipInteraction}
          placement={tooltipPlacement}
          timeout={tooltipTimeout}
        >
          Hover me
        </Tooltip>
        <Tooltip
          title={tooltipTitle}
          theme={tooltipTheme}
          interaction={tooltipInteraction}
          placement={tooltipPlacement}
          timeout={tooltipTimeout}
          tag={Button}
          aria-label='Export to PDF'
          addonLeft={FileExportM}
        />
      </Flex>
      <Flex gap={4} alignItems='center'>
        Hint:
        <Hint
          title={hintTitle}
          theme={hintTheme}
          tag={Button}
          addonLeft={FileExportM}
        />
      </Flex>
      <Flex gap={4} alignItems='center'>
        DescriptionTooltip:
        <DescriptionTooltip
          theme={descriptionTheme}
          interaction={descriptionInteraction}
        >
          <DescriptionTooltip.Trigger tag={ButtonLink} use='secondary'>
            About fastest animals
          </DescriptionTooltip.Trigger>
          <DescriptionTooltip.Popper aria-label='About fastest animals'>
            <Text tag='p' mb={3}>
              The
              {' '}
              <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>
              {' '}
              is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
              of over 300 km/h (190 mph).
            </Text>
            <Text tag='p'>
              The fastest land animal is the cheetah. Among the fastest animals in the sea is the
              black marlin, with uncertain and conflicting reports of recorded speeds.
            </Text>
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
      </Flex>
    </Flex>
  );
};

export const defaultProps: ConfigurableTooltipProps = {
  tooltipTitle: 'Default tooltip contains short text explaining something about the trigger.',
  tooltipTheme: 'default',
  tooltipInteraction: 'hover',
  tooltipPlacement: 'top',
  tooltipTimeout: undefined,
  hintTitle: 'Export to PDF',
  hintTheme: 'default',
  descriptionTheme: 'default',
  descriptionInteraction: 'click',
};

Demo.defaultProps = defaultProps;

export default Demo;
