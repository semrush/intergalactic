import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Counter, { type CounterProps } from '@semcore/ui/counter';
import Spin, { type SpinSize } from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: LinkTriggerSizesProps) => {
  const w = 150;
  const sizes = [
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
  ] as const;

  return (
    <>
      {sizes.map((size) => {
        let spinSize: SpinSize = 'm';
        if (size <= 200) {
          spinSize = 'xs';
        } else if (size <= 500) {
          spinSize = 's';
        }

        let counterSize: CounterProps['size'];
        if (size >= 600) {
          counterSize = 'l';
        } else if (size >= 300) {
          counterSize = 'm';
        }

        return (
          <Text key={size} tag='div' size={size} mb={4}>
            {`${size} `}
            <LinkTrigger
              mr={4}
              active={props.active}
              disabled={props.disabled}
              loading={props.loading}
              color={props.color}
              size={size}
            >
              {props.addonLeft === 'icon' && (
                <LinkTrigger.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</LinkTrigger.Addon>
              )}
              {props.addonLeft === 'badge' && (
                <LinkTrigger.Addon>
                  <Badge type='new' />
                </LinkTrigger.Addon>
              )}
              {props.addonLeft === 'counter' && (
                <LinkTrigger.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </LinkTrigger.Addon>
              )}
              {props.addonLeft === 'spin' && (
                <LinkTrigger.Addon>
                  <Spin size={spinSize} />
                </LinkTrigger.Addon>
              )}
              <LinkTrigger.Text
                w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
                ellipsis={props.ellipsis ? true : undefined}

              >
                The quick brown fox jumps over the lazy dog
              </LinkTrigger.Text>
              {props.addonRight === 'icon' && (
                <LinkTrigger.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</LinkTrigger.Addon>
              )}
              {props.addonRight === 'badge' && (
                <LinkTrigger.Addon>
                  <Badge type='new' />
                </LinkTrigger.Addon>
              )}
              {props.addonRight === 'counter' && (
                <LinkTrigger.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </LinkTrigger.Addon>
              )}
              {props.addonRight === 'spin' && (
                <LinkTrigger.Addon>
                  <Spin size={spinSize} />
                </LinkTrigger.Addon>
              )}
            </LinkTrigger>
          </Text>
        );
      })}
    </>
  );
};

type LinkTriggerSizesProps = {
  addonLeft: 'icon' | 'badge' | 'counter' | 'spin';
  addonRight: 'icon' | 'badge' | 'counter' | 'spin';
  ellipsis: boolean;
  active: boolean;
  disabled: boolean;
  loading: boolean;
  color: string | undefined;
};

export const defaultLinkTriggerSizesProps: LinkTriggerSizesProps = {
  addonLeft: 'icon',
  addonRight: 'badge',
  ellipsis: true,
  active: false,
  disabled: false,
  loading: false,
  color: undefined,
};

Demo.defaultProps = defaultLinkTriggerSizesProps;

export default Demo;
