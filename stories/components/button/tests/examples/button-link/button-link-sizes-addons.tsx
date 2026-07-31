import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { ButtonLink } from '@semcore/ui/button';
import type { NSCounter } from '@semcore/ui/counter';
import Counter from '@semcore/ui/counter';
import type { NSSpin } from '@semcore/ui/spin';
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
    350,
    300,
    200,
    100,
  ] as const;

  return (
    <>
      {sizes.map((size) => {
        let spinSize: NSSpin.Size = 'm';
        if (size <= 200) {
          spinSize = 'xs';
        } else if (size <= 500) {
          spinSize = 's';
        }

        let counterSize: NSCounter.Props['size'];
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
              {props.addonLeft === 'icon' && (
                <ButtonLink.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</ButtonLink.Addon>
              )}
              {props.addonLeft === 'badge' && (
                <ButtonLink.Addon>
                  <Badge type='new' />
                </ButtonLink.Addon>
              )}
              {props.addonLeft === 'counter' && (
                <ButtonLink.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </ButtonLink.Addon>
              )}
              {props.addonLeft === 'spin' && (
                <ButtonLink.Addon>
                  <Spin size={spinSize} />
                </ButtonLink.Addon>
              )}
              <ButtonLink.Text
                w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
                ellipsis={props.ellipsis ? true : undefined}
              >
                The quick brown fox jumps over the lazy dog
              </ButtonLink.Text>
              {props.addonRight === 'icon' && (
                <ButtonLink.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</ButtonLink.Addon>
              )}
              {props.addonRight === 'badge' && (
                <ButtonLink.Addon>
                  <Badge type='new' />
                </ButtonLink.Addon>
              )}
              {props.addonRight === 'counter' && (
                <ButtonLink.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </ButtonLink.Addon>
              )}
              {props.addonRight === 'spin' && (
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
  addonLeft: 'icon' | 'badge' | 'counter' | 'spin';
  addonRight: 'icon' | 'badge' | 'counter' | 'spin';
  use: 'secondary' | 'primary';
  ellipsis: boolean;
  active: boolean;
};

export const defaultButtonLinkSizesProps: ButtonLinkSizesProps = {
  addonLeft: 'icon',
  addonRight: 'badge',
  use: 'secondary',
  ellipsis: true,
  active: false,
};

Demo.defaultProps = defaultButtonLinkSizesProps;

export default Demo;
