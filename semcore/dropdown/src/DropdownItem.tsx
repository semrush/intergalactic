import { Box } from '@semcore/base-components';
import { Root, sstyled } from '@semcore/core';
import React from 'react';

type DropdownItemProps = {
  styles: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
};

export function DropdownItem(props: DropdownItemProps) {
  const SDropdownItem = Root;
  return sstyled(props.styles)(<SDropdownItem render={Box} innerOutline />);
}
