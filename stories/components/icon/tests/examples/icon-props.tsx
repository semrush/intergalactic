import type { IconProps } from '@semcore/icon';
import ArrowsL from '@semcore/icon/Arrows/l';
import ArrowsM from '@semcore/icon/Arrows/m';
import MailFilledL from '@semcore/icon/MailFilled/l';
import MailFilledM from '@semcore/icon/MailFilled/m';
import { Flex, Box } from '@semcore/ui/base-components';
import React from 'react';

export type IconPropsAdvanced = IconProps & {
  color?: string;
  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mx?: number | string;
  my?: number | string;
  scaleIndent?: number;
  iconSize?: 'm' | 'l';
};

const Demo = (props: IconPropsAdvanced) => {
  const {
    color = 'icon-secondary-neutral',
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    iconSize = 'm',
  } = props;

  const marginProps = { m, mt, mr, mb, ml, mx, my };

  const ArrowsIcon = iconSize === 'l' ? ArrowsL : ArrowsM;
  const MailIcon = iconSize === 'l' ? MailFilledL : MailFilledM;

  return (
    <Flex columnGap={2} alignItems='center'>
      <Box
        style={{ border: '1px dashed var(--intergalactic-border-primary)', display: 'inline-flex' }}
      >
        <ArrowsIcon color={color} {...marginProps} />
      </Box>
      <Box
        style={{ border: '1px dashed var(--intergalactic-border-primary)', display: 'inline-flex' }}
      >
        <MailIcon color={color} {...marginProps} />
      </Box>
    </Flex>
  );
};

export const defaultProps: IconPropsAdvanced = {
  color: 'icon-secondary-neutral',
  m: undefined,
  mt: undefined,
  mr: undefined,
  mb: undefined,
  ml: undefined,
  mx: undefined,
  my: undefined,
  iconSize: 'm',
};

Demo.defaultProps = defaultProps;

export default Demo;
