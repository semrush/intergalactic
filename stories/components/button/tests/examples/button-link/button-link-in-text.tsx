import type { Intergalactic } from '@semcore/core';
import CheckM from '@semcore/icon/Check/m';
import { Box } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import type { NSButtonLink } from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = Intergalactic.InternalTypings.EfficientOmit<NSButtonLink.Props, 'formatTags'> & { color?: string };
const Demo = (props: ExampleProps) => {
  return (
    <>
      <Text size={props.size}>
        This is some text with a
        {' '}
        <ButtonLink
          addonLeft={CheckM}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use='primary'
          color={props.color}
        >
          primary ButtonLink
        </ButtonLink>
        {' '}
        and
        {' '}
        <ButtonLink
          addonRight={CheckM}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use='secondary'
          color={props.color}
        >
          secondary ButtonLink
        </ButtonLink>
        {' '}
        to check that everything is on the baseline
      </Text>

      <Box w={150}>
        <Text size={props.size}>
          {' '}
          This is text with a
          {' '}
          <ButtonLink
            size={props.size}
            active={props.active}
            disabled={props.disabled}
            use='secondary'
          >
            Some Long Button Label
          </ButtonLink>
          to check
          <ButtonLink
            size={props.size}
            active={props.active}
            disabled={props.disabled}
            data-testid='button-link4'
          >
            Some Long Button Label
          </ButtonLink>
        </Text>
      </Box>
    </>
  );
};

export const defaultButtonLinkInTextProps: ExampleProps = {
  size: 200,
  use: 'primary',
  hintPlacement: 'top',
};

Demo.defaultProps = defaultButtonLinkInTextProps;
export default Demo;
