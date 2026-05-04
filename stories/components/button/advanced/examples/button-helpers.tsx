import MathPlusM from '@semcore/icon/MathPlus/m';
import { Flex } from '@semcore/ui/base-components';
import Button, { ButtonLink, type ButtonLinkProps, type ButtonProps } from '@semcore/ui/button';
import React from 'react';

type ButtonRowProps = Pick<ButtonProps, 'use' | 'theme' | 'size'>;

export function ButtonRow({ use, theme, size = 'm' }: ButtonRowProps) {
  return (
    <Flex gap={1}>
      <Button use={use} theme={theme} size={size}>
        Button
      </Button>
      <Button use={use} theme={theme} size={size} addonLeft={MathPlusM}>
        Button
      </Button>
      <Button use={use} theme={theme} size={size} addonLeft={MathPlusM} title='Icon only' />
    </Flex>
  );
}

type ButtonLinkRowProps = Pick<ButtonLinkProps, 'use' | 'size'>;

export function ButtonLinkRow({ use, size = 300 }: ButtonLinkRowProps) {
  return (
    <Flex gap={2}>
      <ButtonLink use={use} size={size}>
        ButtonLink
      </ButtonLink>
      <ButtonLink use={use} size={size} addonLeft={MathPlusM}>
        ButtonLink
      </ButtonLink>
      <ButtonLink use={use} size={size} addonLeft={MathPlusM} title='Icon only' />
    </Flex>
  );
}
