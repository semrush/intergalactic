import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import Counter, { type NSCounter } from '@semcore/ui/counter';
import Link from '@semcore/ui/link';
import Spin, { type NSSpin } from '@semcore/ui/spin';
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
  const text = 'The quick brown fox jumps over the lazy dog';

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
            <Link
              href='#'
              mr={4}
              active={props.active}
            >
              {props.addonLeft === 'icon' && (
                <Link.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</Link.Addon>
              )}
              {props.addonLeft === 'badge' && (
                <Link.Addon>
                  <Badge type='new' />
                </Link.Addon>
              )}
              {props.addonLeft === 'counter' && (
                <Link.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </Link.Addon>
              )}
              {props.addonLeft === 'spin' && (
                <Link.Addon>
                  <Spin size={spinSize} />
                </Link.Addon>
              )}
              <Link.Text
                w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
                ellipsis={props.ellipsis ? true : undefined}
              >
                {text}
              </Link.Text>
              {props.addonRight === 'icon' && (
                <Link.Addon>{size < 600 ? <MathPlusAltM /> : <MathPlusAltL />}</Link.Addon>
              )}
              {props.addonRight === 'badge' && (
                <Link.Addon>
                  <Badge type='new' />
                </Link.Addon>
              )}
              {props.addonRight === 'counter' && (
                <Link.Addon>
                  <Counter size={counterSize}>
                    17
                  </Counter>
                </Link.Addon>
              )}
              {props.addonRight === 'spin' && (
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
  addonLeft: 'icon' | 'badge' | 'counter' | 'spin';
  addonRight: 'icon' | 'badge' | 'counter' | 'spin';
  ellipsis: boolean;
  active: boolean;
};

export const defaultLinksizesProps: LinkSizesProps = {
  addonLeft: 'icon',
  addonRight: 'badge',
  ellipsis: true,
  active: false,
};

Demo.defaultProps = defaultLinksizesProps;

export default Demo;
