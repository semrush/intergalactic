import ChevronRightM from '@semcore/icon/ChevronRight/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink } from '@semcore/ui/button';
import React from 'react';

import { themeFor } from '../../tests/themeUtils';

type ExampleProps = {
  use: 'primary' | 'secondary' | 'tertiary';
  size: 'm' | 'l';
  addonLeft: boolean;
  addonRight: boolean;
  linkUse: 'primary' | 'secondary';
  linkSize: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  theme_primary?: string;
  theme_secondary?: string;
  theme_tertiary?: string;
};

const Demo = (props: ExampleProps) => {
  const theme = themeFor(props);
  const addonLeft = props.addonLeft ? MathPlusM : undefined;
  const addonRight = props.addonRight ? ChevronRightM : undefined;

  const buttonProps = {
    use: props.use,
    theme,
    size: props.size,
    addonLeft,
    addonRight,
  } as const;

  const buttons = (
    <Flex gap={2} alignItems='center' flexWrap>
      <Button {...buttonProps}>Default</Button>
      <Button {...buttonProps} active>
        Active
      </Button>
      <Button {...buttonProps} disabled>
        Disabled
      </Button>
      <Button {...buttonProps} loading>
        Loading
      </Button>
      <Button
        use={props.use}
        theme={theme}
        size={props.size}
        addonLeft={MathPlusM}
        aria-label='Add'
      />
    </Flex>
  );

  const links = (
    <Flex gap={2} alignItems='center' flexWrap>
      <ButtonLink
        use={props.linkUse}
        size={props.linkSize}
        addonLeft={addonLeft}
        addonRight={addonRight}
      >
        Default link
      </ButtonLink>
      <ButtonLink
        use={props.linkUse}
        size={props.linkSize}
        addonLeft={addonLeft}
        addonRight={addonRight}
        disabled
      >
        Disabled link
      </ButtonLink>
    </Flex>
  );

  return (
    <Flex direction='column' gap={8}>
      {theme === 'invert'
        ? (
            <Box
              p={4}
              style={{
                background: 'var(--intergalactic-bg-primary-invert)',
                borderRadius: 'var(--intergalactic-surface-rounded, 6px)',
              }}
            >
              {buttons}
            </Box>
          )
        : (
            buttons
          )}
      {links}
    </Flex>
  );
};

export const defaultProps: ExampleProps = {
  use: 'primary',
  size: 'm',
  addonLeft: false,
  addonRight: false,
  linkUse: 'primary',
  linkSize: 300,
};

Demo.defaultProps = defaultProps;

export default Demo;
