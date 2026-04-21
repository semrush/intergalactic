import type { Box, FlexProps } from '@semcore/base-components';
import type { Intergalactic, PropGetterFn } from '@semcore/core';
import type { TIllustrationNamesErrors } from '@semcore/illustration';
import type React from 'react';

declare namespace NSErrors {
  type Props = FlexProps & {
    /**
     * Error icon
     * Icon as a string is a URL to an image.
     */
    icon?: string | React.ReactNode;
  };
  type Ctx = {
    getTextProps: PropGetterFn;
    getDescriptionProps: PropGetterFn;
    getControlsProps: PropGetterFn;
  };
  type IconName = TIllustrationNamesErrors;

  namespace Title {
    type Component = typeof Box;
  }

  namespace Description {
    type Component = typeof Box;
  }

  namespace Controls {
    type Component = typeof Box;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Title: Title.Component;
    Description: Description.Component;
    Controls: Controls.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type ErrorsProps = NSErrors.Props;
/** @deprecated It will be removed in v18. */
export type ErrorsContext = NSErrors.Ctx;
/** @deprecated It will be removed in v18. */
export type IconNamesErrors = NSErrors.IconName;

export type { NSErrors };
