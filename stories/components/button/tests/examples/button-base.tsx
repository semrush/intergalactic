import VideoListM from '@semcore/icon/VideoList/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { ButtonProps } from '@semcore/ui/button';
import React from 'react';

type ExampleProps = ButtonProps & { style?: any };
const Demo = (props: ExampleProps) => {
  return (

    <Flex direction='row' gap={2} mt={10} style={props.style}>
      <Flex gap={2} m={2}>
        <Button
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          theme={props.theme}
          loading={props.loading}
        >
          Button
        </Button>

        <Button
          addonRight={VideoListM}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          theme={props.theme}
          loading={props.loading}

        >
          addonRight
        </Button>

        <Button
          addonLeft={VideoListM}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          theme={props.theme}
          loading={props.loading}

        >
          addonLeft
        </Button>

        <Button
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          theme={props.theme}
          loading={props.loading}

        >
          <Button.Text>Button.Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>

        <Button
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          theme={props.theme}
          addonLeft={VideoListM}
          addonRight={VideoListM}
          loading={props.loading}

        >
          addonLeftRight
        </Button>
        <Button
          addonLeft={VideoListM}
          size={props.size}
          active={props.active}
          disabled={props.disabled}
          use={props.use}
          theme={props.theme}
          loading={props.loading}

        >
          <Button.Text>Button with Badge</Button.Text>
          <Button.Addon>
            <Badge type='new' />
          </Button.Addon>
        </Button>
      </Flex>
    </Flex>

  );
};

export const defaultButtonProps: ExampleProps = {
  size: 'm',
  use: 'primary',
  hintPlacement: 'top',
  style: undefined, // this prop is needed for barckground to verofy some button themes (primary invert for instance)
};

Demo.defaultProps = defaultButtonProps;
export default Demo;
