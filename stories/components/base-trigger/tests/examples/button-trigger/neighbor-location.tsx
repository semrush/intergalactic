import { ButtonTrigger } from '@semcore/ui/base-trigger';
import type { ButtonTriggerProps, BaseTriggerProps } from '@semcore/ui/base-trigger';
import { Flex } from '@semcore/ui/flex-box';
import NeighborLocation from '@semcore/ui/neighbor-location';
import React from 'react';

type ButtonTriggerNeighborLocationExample = ButtonTriggerProps & BaseTriggerProps;
const Demo = (props: ButtonTriggerNeighborLocationExample) => (
  <Flex justifyContent='flex-start'>
    <NeighborLocation>
      <ButtonTrigger
        data-test-id='left-location-trigger'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
        loading={props.loading}
        chevron={props.chevron}
      >
        Left
      </ButtonTrigger>
      <ButtonTrigger
        data-test-id='center-location-trigger'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
        loading={props.loading}
        chevron={props.chevron}
      >
        Center
      </ButtonTrigger>
      <ButtonTrigger
        data-test-id='right-location-trigger'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
        loading={props.loading}
        chevron={props.chevron}
      >
        Right
      </ButtonTrigger>
    </NeighborLocation>

  </Flex>
);

export const buttonTriggerNeighborLocationExampleProps: ButtonTriggerNeighborLocationExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
  loading: undefined,
  chevron: undefined,
};

Demo.defaultProps = buttonTriggerNeighborLocationExampleProps;

export default Demo;
