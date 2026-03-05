import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { ButtonLink } from '@semcore/ui/button';
import type { CounterProps } from '@semcore/ui/counter';
import Counter from '@semcore/ui/counter';
import type { SpinSize } from '@semcore/ui/spin';
import Spin from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: ButtonLinkSizesProps) => {
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
            <ButtonLink
              size={size}
              use={props.use}
              active={props.active}
            >
              {props.merged && (<ButtonLink.Addon tag={size < 600 ? MathPlusAltM : MathPlusAltL} />)}
              {!props.merged && (<ButtonLink.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</ButtonLink.Addon>)}
              <ButtonLink.Text
                w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
                ellipsis={props.ellipsis ? true : undefined}
              >
                The quick brown fox jumps over the lazy dog
              </ButtonLink.Text>
              {props.merged && props.addonRight === 'badge' && (<ButtonLink.Addon tag={Badge} type='new' />)}
              {!props.merged && props.addonRight === 'badge' && (
                <ButtonLink.Addon>
                  <Badge type='new' />
                </ButtonLink.Addon>
              )}
              {props.merged && props.addonRight === 'counter' && (<ButtonLink.Addon tag={Counter} size={counterSize}>17</ButtonLink.Addon>)}
              {!props.merged && props.addonRight === 'counter' && (
                <ButtonLink.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </ButtonLink.Addon>
              )}
              {props.merged && props.addonRight === 'spin' && (<ButtonLink.Addon display='inline-block' size={spinSize} tag={Spin} />)}
              {!props.merged && props.addonRight === 'spin' && (
                <ButtonLink.Addon>
                  <Spin size={spinSize} />
                </ButtonLink.Addon>
              )}
            </ButtonLink>
          </Text>
        );
      })}
    </>
  );
};

type ButtonLinkSizesProps = {
  merged: boolean;
  addonRight: 'badge' | 'counter' | 'spin';
  use: 'secondary' | 'primary';
  ellipsis: boolean;
  active: boolean;
};

export const defaultButtonLinkSizesProps: ButtonLinkSizesProps = {
  merged: true,
  addonRight: 'badge',
  use: 'secondary',
  ellipsis: true,
  active: false,
};

Demo.defaultProps = defaultButtonLinkSizesProps;

export default Demo;
