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

export type ErrorRootComponent = Intergalactic.Component<'div', ErrorsProps, ErrorsContext>;
export type ErrorTitleComponent = typeof Box;
export type ErrorDescriptionComponent = typeof Box;
export type ErrorControlsComponent = typeof Box;

export type ErrorComponent = ErrorRootComponent & {
  Title: ErrorTitleComponent;
  Description: ErrorDescriptionComponent;
  Controls: ErrorControlsComponent;
};
