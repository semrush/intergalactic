import Button from '@semcore/button';
import type { Intergalactic } from '@semcore/core';
import { Root, sstyled } from '@semcore/core';
import React from 'react';

import type { NSSubmitButton } from './SubmitButton.type';

export function SubmitButton(props: Intergalactic.InternalTypings.InferComponentProps<NSSubmitButton.Component>) {
  const { styles } = props;
  const SSubmit = Root;
  return sstyled(styles)(<SSubmit render={Button} type='submit' use='primary' theme='success' />);
}
