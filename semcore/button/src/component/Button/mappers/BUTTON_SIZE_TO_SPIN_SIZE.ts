import type { NSSpin } from '@semcore/spin';

import type { NSButton } from '../Button.type';

export const BUTTON_SIZE_TO_SPIN_SIZE: Record<NSButton.Size, NSSpin.Size> = {
  m: 'xs',
  l: 's',
};
