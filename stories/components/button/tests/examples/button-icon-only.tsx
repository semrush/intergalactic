import VideoListM from '@semcore/icon/VideoList/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { NSButton } from '@semcore/ui/button';
import Tooltip, { Hint } from '@semcore/ui/tooltip';
import React from 'react';

import { themeFor } from '../themeUtils';

type ExampleProps = Exclude<NSButton.Props, 'theme' | 'use'> & { style?: any; theme: string };
const Demo = (props: ExampleProps) => {
  const theme = themeFor(props);

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
          theme={theme}
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
  theme: 'info',
  hintPlacement: 'top',
  style: undefined, // this prop is needed for barckground to verofy some button themes (primary invert for instance)

};

Demo.defaultProps = defaultIconButtonProps;
export default Demo;
