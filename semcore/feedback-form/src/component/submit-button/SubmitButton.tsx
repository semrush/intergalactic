import Button from '@semcore/button';
import React from 'react';
import { Root, sstyled, type IRootComponentProps } from '@semcore/core';

export function SubmitButton(props: IRootComponentProps) {
  const { styles } = props;
  const SSubmit = Root;
  return sstyled(styles)(<SSubmit render={Button} type='submit' use='primary' theme='success' />);
}
