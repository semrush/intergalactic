import type { Intergalactic } from '@semcore/core';
import VideoListM from '@semcore/icon/VideoList/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import type { NSButtonLink } from '@semcore/ui/button';
import React from 'react';

type ExampleProps = Intergalactic.InternalTypings.EfficientOmit<NSButtonLink.Props, 'formatTags'> & { color?: string };
const Demo = (props: ExampleProps) => {
  return (

    <Flex columnGap={2} m={20}>
      <ButtonLink
        title='ButtonLink Addon'
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}
        hintPlacement={props.hintPlacement}

      >
        <ButtonLink.Addon>
          <VideoListM />
        </ButtonLink.Addon>
      </ButtonLink>

      <ButtonLink
        addonLeft={VideoListM}
        aria-label='addonLeft'
        mr={2}
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}
        hintPlacement={props.hintPlacement}
      />

      <ButtonLink
        addonRight={VideoListM}
        aria-label='addonRight'
        mr={2}
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}
        hintPlacement={props.hintPlacement}
        tag='strong'
      />

    </Flex>
  );
};

export const defaultButtonLinkIconOnlyProps: ExampleProps = {
  size: undefined,
  use: 'primary',
  hintPlacement: 'top',
};

Demo.defaultProps = defaultButtonLinkIconOnlyProps;
export default Demo;
