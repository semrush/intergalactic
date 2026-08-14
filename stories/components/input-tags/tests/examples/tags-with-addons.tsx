import Check from '@semcore/icon/Check/m';
import Edit from '@semcore/icon/Edit/m';
import { Flex } from '@semcore/ui/base-components';
import InputTags from '@semcore/ui/input-tags';
import type { NSInputTags } from '@semcore/ui/input-tags';
import React from 'react';

const Demo = (props: NSInputTags.Tag.Props) => {
  const tagProps = props.color
    ? ({ theme: 'primary', color: props.color } as const)
    : { theme: props.theme };

  return (
    <Flex direction='column' gap={2}>
      <Flex direction='column' gap={2} data-testid='normal-state' w={450}>
        <InputTags size='m' state='normal' disabled={props.disabled}>
          <InputTags.Tag
            size={props.size}
            disabled={props.disabled}
            interactive={props.interactive}
            addonRight={Edit}
            {...tagProps}
          >
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Text and addon</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>

          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            disabled={props.disabled}
            interactive={props.interactive}
            addonLeft={Edit}
            active
            {...tagProps}
          >
            <InputTags.Tag.Text>
              Addon text and close
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            disabled={props.disabled}
            interactive={props.interactive}
            {...tagProps}
          >
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Circle addon text and close </InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            disabled={props.disabled}
            interactive={props.interactive}
            {...tagProps}
          >
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Close />
            </InputTags.Tag.Text>
          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            disabled={props.disabled}
            interactive={props.interactive}
            {...tagProps}
          >
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
            </InputTags.Tag.Text>
          </InputTags.Tag>

          <InputTags.Value readOnly={false} />
        </InputTags>

      </Flex>
    </Flex>
  );
};

export const defaultPropsEmail: NSInputTags.Tag.Props = {
  size: 'l',
  disabled: undefined,
  addonRight: undefined,
  addonLeft: undefined,
  interactive: undefined,
};

Demo.defaultProps = defaultPropsEmail;

export default Demo;
