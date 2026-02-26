import CheckM from '@semcore/icon/Check/m';
import { ButtonLink } from '@semcore/ui/button';
import type { ButtonLinkProps } from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = ButtonLinkProps & { color?: string };
const Demo = (props: ExampleProps) => {
  return (

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

  );
};

export const defaultButtonLinkInTextProps: ExampleProps = {
  size: 200,
  use: 'primary',
  hintPlacement: 'top',
};

Demo.defaultProps = defaultButtonLinkInTextProps;
export default Demo;
