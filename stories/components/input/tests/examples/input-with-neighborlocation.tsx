import ShowYesM from '@semcore/icon/ShowYes/m';
import type { BoxProps } from '@semcore/ui/base-components';
import { Flex, NeighborLocation } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import type { NSInput } from '@semcore/ui/input';
import Input from '@semcore/ui/input';
import React from 'react';

type WithNeighborLocationExampleProps = NSInput.Props & NSInput.Value.Props & BoxProps;
const Demo = (props: WithNeighborLocationExampleProps) => {
  return (
    <>
      <Flex direction='row' gap={2} data-testid='wrap'>

        <NeighborLocation tag={Flex} role='group' aria-label='wrapped-input'>
          <Input
            size={props.size}
            w={props.w}
            state={props.state}
            disabled={props.disabled}
          >
            <Input.Value
              autoFocus={props.autoFocus}
              placeholder={props.placeholder}
              aria-labelledby='1st-example'
              readOnly={props.readOnly}
            />
            <Input.Addon>
              <ButtonLink title='Test hint' use='secondary' addonLeft={ShowYesM} disabled={props.disabled} />
            </Input.Addon>
          </Input>
          <Input
            size={props.size}
            w={props.w}
            state={props.state}
            disabled={props.disabled}
          >
            <Input.Value
              autoFocus={props.autoFocus}
              placeholder={props.placeholder}
              aria-labelledby='2nd-example'
              readOnly={props.readOnly}
            />

          </Input>
          <Input
            size={props.size}
            w={props.w}
            state={props.state}
            disabled={props.disabled}
          >
            <Input.Value
              autoFocus={props.autoFocus}
              placeholder={props.placeholder}
              aria-labelledby='3rd-example'
              readOnly={props.readOnly}
            />
          </Input>
        </NeighborLocation>
      </Flex>
    </>
  );
};

export const withNeighborLocationExampleProps: WithNeighborLocationExampleProps = {

  size: 'm',
  state: 'normal',
  w: 100,
  autoFocus: false,
  placeholder: 'placeholder',
  readOnly: undefined,
  disabled: undefined,

};

Demo.defaultProps = withNeighborLocationExampleProps;

export default Demo;
