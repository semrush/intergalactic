import React from 'react';
import { createComponent, Component, Root, sstyled, Intergalactic } from '@semcore/core';
import { Flex, Box, BoxProps } from '@semcore/flex-box';
import style from '../../style/slider-rating.shadow.css';
import keyboardFocusEnhance from '@semcore/core/lib/utils/enhances/keyboardFocusEnhance';

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

class SliderRatingRoot extends Component<SliderRatingProps, State> {
  static displayName = 'SliderRating';
  static style = style;

  static enhance = [keyboardFocusEnhance()];

  state: State = {
    hoveredIndex: -1,
    clickedIndex: -1,
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
    };
  }

  setValue = (newValue: number) => {
    const { onChange, value } = this.asProps;

    if (onChange) {
      onChange(newValue);
    }

    if (newValue <= value) {
      this.setState({ clickedIndex: newValue });
    } else {
      this.setState({ clickedIndex: -1 });
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

  render() {
    const { styles, value } = this.asProps;
    const { hoveredIndex } = this.state;
    const SSliderRating = Root;

    const label = value ? value : hoveredIndex === -1 ? 'Not set' : hoveredIndex + 1;

    return sstyled(styles)(
      <SSliderRating
        render={Flex}
        gap={1}
        onMouseLeave={this.handleMouseLeave}
        onKeyDown={this.handleKeyDown}
        role='slider'
        aria-orientation='horizontal'
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuetext={label}
        aria-valuenow={hoveredIndex + 1}
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
      width='22'
      height='21'
      viewBox='0 0 22 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {props.filled ? (
        <path
          d='M10.6463 0.213566C10.7963 -0.0711885 11.2037 -0.071189 11.3537 0.213566L14.6682 6.50744L21.668 7.72084C21.9847 7.77572 22.1105 8.16305 21.8867 8.39378L16.9353 13.4978L17.9465 20.5422C17.9922 20.8607 17.6626 21.1002 17.3741 20.9581L11 17.8181L4.62585 20.9581C4.33738 21.1002 4.00781 20.8607 4.05353 20.5422L5.0647 13.4978L0.113338 8.39378C-0.110493 8.16305 0.0153421 7.77572 0.331965 7.72084L7.33178 6.50744L10.6463 0.213566Z'
          // fill='#FDC23C'
        />
      ) : (
        <path
          d='M13.7834 6.9734L14.0127 7.40871L14.4974 7.49274L20.3785 8.51222L16.2175 12.8015L15.8757 13.1539L15.9454 13.6399L16.7949 19.558L11.4419 16.921L11 16.7033L10.5581 16.921L5.20505 19.558L6.05456 13.6399L6.12432 13.1539L5.78246 12.8015L1.62146 8.51222L7.50258 7.49274L7.98734 7.40871L8.21659 6.9734L11 1.68803L13.7834 6.9734ZM21.4972 8.70614C21.4969 8.70608 21.4965 8.70602 21.4961 8.70595L21.4972 8.70614ZM0.502765 8.70614L0.503758 8.70597C0.503427 8.70603 0.503095 8.70609 0.502764 8.70614L0.400352 8.11535L0.502765 8.70614Z'
          // stroke='#A9ABB6'
          // strokeWidth='2'
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
