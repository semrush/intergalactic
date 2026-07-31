import type { NSBox, NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

import type { LocalizedMessages } from '../../translations/__intergalactic-dynamic-locales';

declare namespace NSSliderRating {
    type Props = {
      value: number;
      onChange?: (value: number) => void;
      readonly?: boolean;
    };
    type DefaultProps = {
      i18n: LocalizedMessages;
      locale: 'en';
    };
    type State = {
      hoveredIndex: number;
      clickedIndex: number;
    };

    namespace Star {
        type Props = {
          filled?: boolean;
        };

        type Component = Intergalactic.Component<NSBox.Component, Props>;
    }

    type Component = Intergalactic.Component<NSFlex.Component, Props> & {
      Star: Star.Component;
    };
}

export type { NSSliderRating };
