import { Flex, Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { ButtonProps } from '@semcore/ui/button';
import VideoListM from '@semcore/ui/icon/VideoList/m';
import Tooltip, { Hint } from '@semcore/ui/tooltip';
import React from 'react';

type ExampleProps = ButtonProps & { style?: any };
const Demo = (props: ExampleProps) => {
  return (

    <Flex direction='row' gap={2} m={15} style={props.style}>

      <Flex data-test-id='icon-only' gap={2} m={2}>
        <Button
          mr={2}
          addonLeft={VideoListM}
          title='Addon only'
          hintPlacement={props.hintPlacement}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          theme={props.theme}
          loading={props.loading}
        />
        <Hint
          mr={2}
          tag={Button}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          addonLeft={VideoListM}
          title='Hint Button Addon'
          hintPlacement={props.hintPlacement}
          loading={props.loading}

        />
        <Tooltip
          tag={Button}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          addonLeft={VideoListM}
          title='Tooltip Button Addon'
          hintPlacement={props.hintPlacement}
          loading={props.loading}

        />
      </Flex>

    </Flex>

  );
};

export const defaultIconButtonProps: ExampleProps = {
  size: 'm',
  use: 'primary',
  theme: 'muted',
  active: undefined,
  disabled: undefined,
  hintPlacement: 'top',
  loading: undefined,
  style: undefined,
};

Demo.defaultProps = defaultIconButtonProps;
export default Demo;
