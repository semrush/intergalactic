import type { NSCheckbox } from '@semcore/checkbox';
import type { Intergalactic } from '@semcore/core';
import type React from 'react';

declare namespace NSCheckboxButton {
    type Props = Omit<NSCheckbox.Props, 'label'> & {
      focused: boolean;
      label: React.ReactNode;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSCheckboxButton };
