import React from 'react';
import { createComponent, Component, Root, sstyled, Intergalactic } from '@semcore/core';
import { Flex, Box, BoxProps } from '@semcore/flex-box';
import style from '../../style/slider-rating.shadow.css';
import uniqueIDEnhancement from '@semcore/core/lib/utils/uniqueID';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';

type SliderRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
};

type State = {
  hoveredIndex: number;
  clickedIndex: number;
};

type StarProps = BoxProps & {
  filled?: boolean;
};

const MIN = 1;
const MAX = 5;

class SliderRatingRoot extends Component<
  SliderRatingProps,
  {},
  State,
  typeof SliderRatingRoot.enhance
> {
  static displayName = 'SliderRating';
  static style = style;

  static enhance = [uniqueIDEnhancement(), i18nEnhance(localizedMessages)] as const;

  state: State = {
    hoveredIndex: -1,
    clickedIndex: -1,
  };

  static defaultProps = {
    i18n: localizedMessages,
    locale: 'en',
  };

  handleClick = (newValue: number) => (e: React.SyntheticEvent<SVGElement>) => {
    const { readonly } = this.asProps;

    if (!readonly) {
      this.setValue(newValue);
    }
  };

  handleMouseEnder = (index: number) => () => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: -1 });
  };

  getStarProps(_: any, index: number) {
    const { value, readonly } = this.asProps;
    const { hoveredIndex } = this.state;

    return {
      filled: value ? index + 1 <= value || index <= hoveredIndex : index <= hoveredIndex,
      onClick: this.handleClick(index + 1),
      onMouseEnter: readonly ? undefined : this.handleMouseEnder(index),
      hovered: hoveredIndex === index,
    };
  }

  setValue = (newValue: number) => {
    const { onChange, value } = this.asProps;

    if (onChange) {
      onChange(newValue);
    }

    if (newValue <= value) {
      this.setState({ clickedIndex: newValue, hoveredIndex: -1 });
    } else {
      this.setState({ clickedIndex: -1, hoveredIndex: -1 });
    }
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key)) return;
    event.preventDefault();

    if (event.key === 'Enter') {
      const { hoveredIndex } = this.state;

      this.setValue(hoveredIndex + 1);
    } else {
      const { value } = this.asProps;
      const { hoveredIndex } = this.state;

      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      let newValue = hoveredIndex === -1 ? value + direction : hoveredIndex + 1 + direction;

      if (newValue > MAX) newValue = MAX;
      if (newValue < MIN) newValue = MIN;

      this.setState({ hoveredIndex: newValue - 1 });
    }
  };

  getLabelText() {
    const { hoveredIndex } = this.state;
    const { readonly, value, getI18nText } = this.asProps;

    if (readonly) {
      return getI18nText('FeedbackRating.SliderRating.aria-valuetext.readonly', {
        selectedRating: value,
        max: MAX,
      });
    }

    if (value) {
      const selectedRating = hoveredIndex > -1 ? hoveredIndex + 1 : value;
      return getI18nText('FeedbackRating.SliderRating.aria-valuetext', {
        selectedRating: selectedRating,
        max: MAX,
      });
    }

    return hoveredIndex === -1
      ? getI18nText('FeedbackRating.SliderRating.aria-valuetext.empty')
      : getI18nText('FeedbackRating.SliderRating.aria-valuetext', {
          selectedRating: hoveredIndex + 1,
          max: MAX,
        });
  }

  render() {
    const { styles, readonly, getI18nText, value } = this.asProps;
    const { hoveredIndex } = this.state;

    const SSliderRating = Root;
    const label = this.getLabelText();

    if (readonly) {
      return (
        <SSliderRating render={Flex} gap={1} role='img' aria-label={label}>
          {new Array(MAX).fill(null).map((_, index) => {
            return (
              <Box key={index} position={'relative'}>
                <SliderRating.Star />
              </Box>
            );
          })}
        </SSliderRating>
      );
    }

    const hoverValue = hoveredIndex + 1;

    const editModeLabel =
      hoverValue > 0 || value
        ? `${label}. ${getI18nText(
            'FeedbackRating.SliderRating.ScreenReaderOnly.sliderDescriber',
          )}.`
        : label;

    return sstyled(styles)(
      <SSliderRating
        render={Flex}
        gap={1}
        tabIndex={0}
        onMouseLeave={this.handleMouseLeave}
        onKeyDown={this.handleKeyDown}
        role={'slider'}
        aria-orientation='horizontal'
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuetext={editModeLabel}
        aria-valuenow={hoverValue}
      >
        {new Array(MAX).fill(null).map((_, index) => {
          return (
            <Box key={index} position={'relative'}>
              <SliderRating.Star />
            </Box>
          );
        })}
      </SSliderRating>,
    );
  }
}

function Star(props: StarProps) {
  const SStar = Root;
  return sstyled(props.styles)(
    <SStar
      render={Box}
      tag={'svg'}
      role='none'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {props.filled ? (
        <path d='M11.646 1.214a.4.4 0 0 1 .708 0l3.314 6.293 7 1.214a.4.4 0 0 1 .219.673l-4.952 5.104 1.012 7.044a.4.4 0 0 1-.573.416L12 18.818l-6.374 3.14a.4.4 0 0 1-.572-.416l1.01-7.044-4.95-5.104a.4.4 0 0 1 .218-.673l7-1.214 3.314-6.293Z' />
      ) : (
        <path
          d='M14.358 9.31 12 4.834 9.642 9.31l-4.985.864 3.526 3.634-.72 5.014L12 16.588l4.537 2.235-.72-5.014 3.526-3.634-4.985-.864Zm8.31-.59a.4.4 0 0 1 .219.674l-4.952 5.104 1.012 7.044a.4.4 0 0 1-.573.416L12 18.818l-6.374 3.14a.4.4 0 0 1-.572-.416l1.01-7.044-4.95-5.104a.4.4 0 0 1 .218-.673l7-1.214 3.314-6.293a.4.4 0 0 1 .708 0l3.314 6.293 7 1.214Z'
          fillRule='evenodd'
          clipRule='evenodd'
        />
      )}
    </SStar>,
  );
}
Star.displayName = 'Star';

const SliderRating = createComponent(SliderRatingRoot, {
  Star,
}) as Intergalactic.Component<typeof Flex, SliderRatingProps> & {
  Star: Intergalactic.Component<typeof Box, StarProps>;
};

export default SliderRating;
