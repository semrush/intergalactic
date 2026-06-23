import Check from '@semcore/icon/Check/m';
import Edit from '@semcore/icon/Edit/m';
import { Flex, type BoxProps } from '@semcore/ui/base-components';
import InputTags from '@semcore/ui/input-tags';
import type { InputTagsTagProps } from '@semcore/ui/input-tags';
import React from 'react';

type ExampleInputTagsProps = InputTagsTagProps & {
  textContentWidth?: BoxProps['w'];
  ellipsis?: boolean;
};

const Demo = (props: ExampleInputTagsProps) => {
  const textContentProps = props.ellipsis === undefined
    ? { w: props.textContentWidth }
    : { w: props.textContentWidth, ellipsis: props.ellipsis };

  return (
    <Flex direction='column' gap={2}>
      <Flex direction='column' gap={2} data-testid='normal-state' w={450}>
        <InputTags size='m' state='normal' disabled={props.disabled}>
          <InputTags.Tag
            size={props.size}
            theme={props.theme}
            disabled={props.disabled}
            interactive={props.interactive}
            color={props.color}
            addonRight={Edit}
          >
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content {...textContentProps}>
                Text and addon with a very long label that should be truncated by default
              </InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>

          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            theme={props.theme}
            disabled={props.disabled}

            interactive={props.interactive}

            color={props.color}
            addonLeft={Edit}
            active
          >
            <InputTags.Tag.Text>
              Addon text and close
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            theme={props.theme}
            disabled={props.disabled}

            interactive={props.interactive}

            color={props.color}
          >
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon w={props.addonWidth}>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content {...textContentProps}>
                Circle addon text and close with a very long label
              </InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            theme={props.theme}
            disabled={props.disabled}

            interactive={props.interactive}

            color={props.color}
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
              <InputTags.Tag.Text.Content>
                Circle addon text and close
              </InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag
            size={props.size}
            theme={props.theme}
            disabled={props.disabled}

            interactive={props.interactive}

            color={props.color}
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
            theme={props.theme}
            disabled={props.disabled}
            interactive={props.interactive}
            color={props.color}
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

export const defaultPropsEmail: ExampleInputTagsProps = {
  size: 'l',
  theme: 'primary',
  disabled: undefined,
  addonRight: undefined,
  addonLeft: undefined,
  interactive: undefined,
  color: 'gray-500',
  textContentWidth: 140,
  ellipsis: undefined,
};

Demo.defaultProps = defaultPropsEmail;

export default Demo;
