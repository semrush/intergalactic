import Search from '@semcore/icon/Search/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/flex-box';
import type { BoxProps } from '@semcore/ui/flex-box';
import type { InputProps, InputValueProps } from '@semcore/ui/input';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type BaseExampleProps = InputProps & InputValueProps & BoxProps;
const Demo = (props: BaseExampleProps) => {
  return (
    <Flex direction='row' gap={2} data-testid='wrap'>
      <Flex direction='column' gap={2} mb={3} data-testid='Default'>
        <Text size={100}>Default input</Text>
        <Input
          size={props.size}
          w={props.w}
          state={props.state}
          disabled={props.disabled}
        >
          <Input.Value
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            aria-labelledby='base-example'
            readOnly={props.readOnly}
          />
        </Input>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Left-addon'>
        <Text size={100}>Left addon</Text>
        <Input
          size={props.size}
          w={props.w}
          state={props.state}
          disabled={props.disabled}
        >
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value

            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            aria-labelledby='addon-left-example'
            readOnly={props.readOnly}
          />
        </Input>

      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Left-right-addon'>
        <Text size={100}>Left Right addon</Text>
        <Input
          size={props.size}
          w={props.w}
          state={props.state}
          disabled={props.disabled}
        >
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value

            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            aria-labelledby='addon-left-right-example'
            readOnly={props.readOnly}
          />
          <Input.Addon>
            <Badge type='alpha' />
          </Input.Addon>
        </Input>

      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Right-addon'>
        <Text size={100}>Right addon</Text>
        <Input
          size={props.size}
          w={props.w}
          state={props.state}
          disabled={props.disabled}
        >

          <Input.Value

            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            aria-labelledby='addon-left-right-example'
            readOnly={props.readOnly}
          />
          <Input.Addon>
            <Badge type='alpha' />
          </Input.Addon>
        </Input>

      </Flex>

    </Flex>
  );
};

export const baseExampleProps: BaseExampleProps = {

  size: 'm',
  state: 'normal',
  w: 120,
  autoFocus: false,
  placeholder: 'placeholder',
  readOnly: undefined,
  disabled: undefined,

};

Demo.defaultProps = baseExampleProps;
export default Demo;
