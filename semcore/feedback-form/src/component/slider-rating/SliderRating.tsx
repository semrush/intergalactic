import React from 'react';
import createComponent, { Component, Root, sstyled, Intergalactic } from '@semcore/core';
import { Flex, Box, BoxProps } from '@semcore/flex-box';
import style from '../../style/slider-rating.shadow.css';

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

type SplashProps = BoxProps & {
  blink?: boolean;
  left: string;
  top: string;
};

class SliderRatingRoot extends Component<SliderRatingProps, State> {
  static displayName = 'SliderRating';
  static style = style;

  state: State = {
    hoveredIndex: -1,
    clickedIndex: -1,
  };

  handleClick = (newValue: number) => (e: React.SyntheticEvent<SVGElement>) => {
    const { onChange, readonly, value } = this.asProps;

    if (!readonly && onChange) {
      onChange(newValue);

      if (newValue <= value) {
        this.setState({ clickedIndex: newValue });
      } else {
        this.setState({ clickedIndex: -1 });
      }
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

  getSplashProps(_: any, index: number) {
    const { value } = this.asProps;
    const { clickedIndex } = this.state;

    return {
      blink: clickedIndex > -1 ? index + 1 > (value - 1) * 5 && index + 1 <= value * 5 : false,
    };
  }

  render() {
    const { styles } = this.asProps;
    const SSliderRating = Root;

    return sstyled(styles)(
      <SSliderRating render={Flex} gap={1} onMouseLeave={this.handleMouseLeave}>
        {new Array(5).fill(null).map((_, index) => {
          return (
            <Box key={index} position={'relative'}>
              <SliderRating.Star />
              <SliderRating.Splash left={'1px'} top={'0px'} />
              <SliderRating.Splash left={'17px'} top={'0px'} />
              <SliderRating.Splash left={'21px'} top={'14px'} />
              <SliderRating.Splash left={'9px'} top={'22px'} />
              <SliderRating.Splash left={'-3px'} top={'14px'} />
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
          fill='#FDC23C'
        />
      ) : (
        <path
          d='M13.7834 6.9734L14.0127 7.40871L14.4974 7.49274L20.3785 8.51222L16.2175 12.8015L15.8757 13.1539L15.9454 13.6399L16.7949 19.558L11.4419 16.921L11 16.7033L10.5581 16.921L5.20505 19.558L6.05456 13.6399L6.12432 13.1539L5.78246 12.8015L1.62146 8.51222L7.50258 7.49274L7.98734 7.40871L8.21659 6.9734L11 1.68803L13.7834 6.9734ZM21.4972 8.70614C21.4969 8.70608 21.4965 8.70602 21.4961 8.70595L21.4972 8.70614ZM0.502765 8.70614L0.503758 8.70597C0.503427 8.70603 0.503095 8.70609 0.502764 8.70614L0.400352 8.11535L0.502765 8.70614Z'
          stroke='#A9ABB6'
          strokeWidth='2'
        />
      )}
    </SStar>,
  );
}
Star.displayName = 'Star';

function Splash(props: SplashProps) {
  const SSplash = Root;
  return sstyled(props.styles)(<SSplash render={Box} />);
}
Splash.displayName = 'Splash';

const SliderRating = createComponent(SliderRatingRoot, {
  Star,
  Splash,
}) as Intergalactic.Component<typeof Flex, SliderRatingProps> & {
  Star: Intergalactic.Component<typeof Box, StarProps>;
  Splash: Intergalactic.Component<typeof Box, SplashProps>;
};

export default SliderRating;
