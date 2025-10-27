import { ButtonLink } from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import type { BoxProps } from '@semcore/ui/flex-box';
import ShowYesM from '@semcore/ui/icon/ShowYes/m';
import type { InputProps, InputValueProps } from '@semcore/ui/input';
import Input from '@semcore/ui/input';
import NeighborLocation from '@semcore/ui/neighbor-location';
import { Hint } from '@semcore/ui/tooltip';
import React from 'react';

type WithNeighborLocationExampleProps = InputProps & InputValueProps & BoxProps;
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
              <Hint title='Test hint' tag={ButtonLink} use='secondary' addonLeft={ShowYesM} />
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
