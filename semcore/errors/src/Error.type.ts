import type { Box, FlexProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { TIllustrationNamesErrors } from '@semcore/illustration';
import type React from 'react';

export type IconNamesErrors = TIllustrationNamesErrors;

export type ErrorsProps = FlexProps & {
  /**
   * Error icon
   * Icon as a string is a URL to an image.
   */
  icon?: string | React.ReactNode;
};

export type ErrorsContext = {
  getTextProps: PropGetterFn;
  getDescriptionProps: PropGetterFn;
  getControlsProps: PropGetterFn;
};

export type ErrorComponent = Intergalactic.Component<'div', ErrorsProps, ErrorsContext> & {
  Title: typeof Box;
  Description: typeof Box;
  Controls: typeof Box;
};
