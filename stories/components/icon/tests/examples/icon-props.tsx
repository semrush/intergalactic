import type { IconProps } from '@semcore/icon';
import ArrowsL from '@semcore/icon/Arrows/l';
import ArrowsM from '@semcore/icon/Arrows/m';
import MailFilledL from '@semcore/icon/MailFilled/l';
import MailFilledM from '@semcore/icon/MailFilled/m';
import { Flex, Box } from '@semcore/ui/base-components';
import React from 'react';

export type IconPropsAdvanced = IconProps & {
  iconSize?: 'm' | 'l';
};

const Demo = (props: IconPropsAdvanced) => {
  const {
    iconSize = 'm',
  } = props;

  const ArrowsIcon = iconSize === 'l' ? ArrowsL : ArrowsM;
  const MailIcon = iconSize === 'l' ? MailFilledL : MailFilledM;

  return (
    <Flex columnGap={2} alignItems='center'>
      <Box
        style={{ border: '1px dashed var(--intergalactic-border-primary)', display: 'inline-flex' }}
      >
        <ArrowsIcon color={props.color} m={props.m} mb={props.mb} mt={props.mt} mr={props.mr} ml={props.ml} mx={props.mx} my={props.my} scaleIndent={props.scaleIndent} />
      </Box>
      <Box
        style={{ border: '1px dashed var(--intergalactic-border-primary)', display: 'inline-flex' }}
      >
        <MailIcon color={props.color} m={props.m} mb={props.mb} mt={props.mt} mr={props.mr} ml={props.ml} mx={props.mx} my={props.my} scaleIndent={props.scaleIndent} />
      </Box>
    </Flex>
  );
};

export const defaultProps: IconPropsAdvanced = {
  iconSize: 'm',
  scaleIndent: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
