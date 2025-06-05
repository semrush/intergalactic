import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import React from 'react';

type DropdownItemProps = {
  styles: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
};

export function DropdownItem(props: DropdownItemProps) {
  const SDropdownItem = Root;
  return sstyled(props.styles)(<SDropdownItem render={Box} innerOutline />);
}
