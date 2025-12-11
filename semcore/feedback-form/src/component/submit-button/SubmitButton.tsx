import type { ButtonProps } from '@semcore/button';
import Button from '@semcore/button';
import { Root, sstyled } from '@semcore/core';
import React from 'react';

export function SubmitButton(props: ButtonProps) {
  const { styles } = props;
  const SSubmit = Root();
  return sstyled(styles)(<SSubmit render={Button} type='submit' use='primary' theme='success' />);
}
