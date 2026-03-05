import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import Counter, { type CounterProps } from '@semcore/ui/counter';
import Link from '@semcore/ui/link';
import Spin, { type SpinSize } from '@semcore/ui/spin';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: LinkSizesProps) => {
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
            <Link
              href='#'
              mr={4}
              active={props.active}
            >
              {props.merged && (<Link.Addon tag={size < 600 ? MathPlusAltM : MathPlusAltL} />)}
              {!props.merged && (<Link.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</Link.Addon>)}
              <Link.Text
                w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
                ellipsis={props.ellipsis ? true : undefined}
              >
                The quick brown fox jumps over the lazy dog
              </Link.Text>
              {props.merged && props.addonRight === 'badge' && (<Link.Addon tag={Badge} type='new' />)}
              {!props.merged && props.addonRight === 'badge' && (
                <Link.Addon>
                  <Badge type='new' />
                </Link.Addon>
              )}
              {props.merged && props.addonRight === 'counter' && (<Link.Addon tag={Counter} size={counterSize}>17</Link.Addon>)}
              {!props.merged && props.addonRight === 'counter' && (
                <Link.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </Link.Addon>
              )}
              {props.merged && props.addonRight === 'spin' && (<Link.Addon display='inline-block' size={spinSize} tag={Spin} />)}
              {!props.merged && props.addonRight === 'spin' && (
                <Link.Addon>
                  <Spin size={spinSize} />
                </Link.Addon>
              )}
            </Link>

          </Text>
        );
      })}
    </>
  );
};

type LinkSizesProps = {
  merged: boolean;
  addonRight: 'badge' | 'counter' | 'spin';
  ellipsis: boolean;
  active: boolean;
};

export const defaultLinksizesProps: LinkSizesProps = {
  merged: true,
  addonRight: 'badge',
  ellipsis: true,
  active: false,
};

Demo.defaultProps = defaultLinksizesProps;

export default Demo;
