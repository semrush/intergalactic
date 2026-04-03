import VideoListM from '@semcore/icon/VideoList/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { ButtonProps } from '@semcore/ui/button';
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
  hintPlacement: 'top',
  style: undefined, // this prop is needed for barckground to verofy some button themes (primary invert for instance)

};

Demo.defaultProps = defaultButtonNeighborProps;
export default Demo;
