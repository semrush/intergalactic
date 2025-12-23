import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { ButtonProps } from '@semcore/ui/button';
import VideoListM from '@semcore/ui/icon/VideoList/m';
import React from 'react';

type ExampleProps = ButtonProps & { style?: any };
const Demo = (props: ExampleProps) => {
  return (

    <Flex direction='row' gap={2} mt={10} style={props.style}>
      <Flex gap={2} m={2}>
        <Flex role='group' aria-label='secondary buttons'>
          <Button
            neighborLocation='right'
            addonRight={VideoListM}
            size={props.size}
            active={props.active}
            disabled={props.disabled}
            use={props.use}
            theme={props.theme}
            loading={props.loading}
          >
            First
          </Button>
          <Button
            neighborLocation='both'

            size={props.size}
            active={props.active}
            disabled={props.disabled}
            use={props.use}
            theme={props.theme}
            loading={props.loading}
          >
            Middle
          </Button>
          <Button
            neighborLocation='left'
            addonLeft={VideoListM}
            size={props.size}
            active={props.active}
            disabled={props.disabled}
            use={props.use}
            theme={props.theme}
            loading={props.loading}
          >
            Last
          </Button>
        </Flex>
      </Flex>
    </Flex>

  );
};

export const defaultButtonNeighborProps: ExampleProps = {
  size: 'm',
  use: 'primary',
  theme: 'muted',
  active: undefined,
  disabled: undefined,
  hintPlacement: 'top',
  loading: undefined,
  style: undefined,
};

Demo.defaultProps = defaultButtonNeighborProps;
export default Demo;
