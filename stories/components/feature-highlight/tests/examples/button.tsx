import SummaryAI from '@semcore/icon/SummaryAI/m';
import type { TextEllipsisProps } from '@semcore/typography';
import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import type { ButtonProps } from '@semcore/ui/button';
import { ButtonFH, BadgeFH } from '@semcore/ui/feature-highlight';
import React from 'react';

export type ButtonFHAdvancedProps = ButtonProps & {
  buttonText?: string;
  showBadge?: boolean;
  badgeText?: string;
  animatedSparkleCount?: number;
  showIcon?: boolean;
  useBadge?: 'accent' | 'neutral';
  use?: 'primary' | 'secondary' | 'tertiary';
  size?: 'm' | 'l';
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  ellipsis?: TextEllipsisProps;
  w?: number | string;
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: ButtonFHAdvancedProps) => {
  const {
    buttonText = 'Primary Large',
    showBadge = false,
    badgeText = 'AI-powered',
    animatedSparkleCount = 5,
    showIcon = true,
    hintPlacement,
    hintProps,
    use = 'primary',
    size = 'l',
    disabled = false,
    loading = false,
    active = false,
    ellipsis,
  } = props;

  return (
    <>
      <Flex flexWrap gap={4}>
        <ButtonFH
          aria-describedby='button-aria-desc'
          use={use}
          addonLeft={showIcon ? SummaryAI : undefined}
          size={size}
          disabled={disabled}
          loading={loading}
          active={active}
        >
          {showBadge
            ? (
                <>
                  <ButtonFH.Addon animatedSparkleCount={animatedSparkleCount} />
                  <ButtonFH.Text
                    {...ellipsis}
                    hint={props.hintProps}
                    hint:placement={props.hintPlacement}
                    w={props.w}
                  >
                    {buttonText}
                  </ButtonFH.Text>
                  <ButtonFH.Addon>
                    <BadgeFH use={props.useBadge}>{badgeText}</BadgeFH>
                  </ButtonFH.Addon>
                </>
              )
            : (
                <ButtonFH.Text
                  {...ellipsis}
                  hint={props.hintProps}
                  hint:placement={props.hintPlacement}
                  w={props.w}
                >
                  {buttonText}
                </ButtonFH.Text>
              )}
        </ButtonFH>
        <ScreenReaderOnly id='button-aria-desc'>Powered by AI</ScreenReaderOnly>
      </Flex>
    </>
  );
};

export const defaultProps: ButtonFHAdvancedProps = {
  buttonText: 'Button Feature',
  showBadge: false,
  badgeText: 'AI-powered',
  animatedSparkleCount: 5,
  showIcon: true,
  use: 'primary',
  size: 'l',
  disabled: false,
  loading: false,
  active: false,
  useBadge: 'accent',
  ellipsis: {
    ellipsis: true,
  },
  w: 200,
};

Demo.defaultProps = defaultProps;

export default Demo;
