import MathPlusAltL from '@semcore/icon/MathPlusAlt/l';
import MathPlusAltM from '@semcore/icon/MathPlusAlt/m';
import Badge from '@semcore/ui/badge';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Counter, { type CounterProps } from '@semcore/ui/counter';
import Flags from '@semcore/ui/flags';
import Tag, { type NSTag } from '@semcore/ui/tag';
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
  const text = 'The quick brown fox jumps over the lazy dog';

  return (
    <>
      {sizes.map((size) => {
        let counterSize: CounterProps['size'];
        if (size >= 600) {
          counterSize = 'l';
        } else if (size >= 300) {
          counterSize = 'm';
        }

        let tagSize: NSTag.Size;
        if (size >= 600) {
          tagSize = 'xl';
        } else if (size >= 300) {
          tagSize = 'l';
        } else {
          tagSize = 'm';
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
              {props.addonLeft === 'tag' && (
                <LinkTrigger.Addon>
                  <Tag size={tagSize}>Label</Tag>
                </LinkTrigger.Addon>
              )}
              {props.addonLeft === 'flag' && (
                <LinkTrigger.Addon>
                  <Flags name='US' />
                </LinkTrigger.Addon>
              )}
              <LinkTrigger.Text
                w={props.ellipsis ? size < 600 ? w : w * 2 : undefined}
                ellipsis={props.ellipsis ? true : undefined}

              >
                {text}
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
              {props.addonRight === 'tag' && (
                <LinkTrigger.Addon>
                  <Tag size={tagSize}>Label</Tag>
                </LinkTrigger.Addon>
              )}
              {props.addonRight === 'flag' && (
                <LinkTrigger.Addon>
                  <Flags name='US' />
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
  addonLeft: 'icon' | 'badge' | 'counter' | 'tag' | 'flag';
  addonRight: 'icon' | 'badge' | 'counter' | 'tag' | 'flag' | 'none';
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
