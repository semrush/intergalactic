import { Flex, NeighborLocation } from '@semcore/ui/base-components';
import BaseTrigger from '@semcore/ui/base-trigger';
import type { BaseTriggerProps } from '@semcore/ui/base-trigger';
import React from 'react';

type BaseTriggerNeighborLocationExample = BaseTriggerProps;
const Demo = (props: BaseTriggerNeighborLocationExample) => (
  <Flex justifyContent='flex-start'>
    <NeighborLocation>
      <BaseTrigger
        data-test-id='left-location-trigger'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
      >
        Left
      </BaseTrigger>
      <BaseTrigger
        data-test-id='center-location-trigger'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
      >
        Center
      </BaseTrigger>
      <BaseTrigger
        data-test-id='right-location-trigger'
        size={props.size}
        state={props.state}
        active={props.active}
        empty={props.empty}
        placeholder={props.placeholder}
        disabled={props.disabled}
      >
        Right
      </BaseTrigger>
    </NeighborLocation>

  </Flex>
);

export const baseTriggerNeighborLocationExampleProps: BaseTriggerNeighborLocationExample = {
  size: 'm',
  state: undefined,
  active: undefined,
  empty: undefined,
  placeholder: undefined,
  disabled: undefined,
};

Demo.defaultProps = baseTriggerNeighborLocationExampleProps;

export default Demo;
