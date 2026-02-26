import VideoListM from '@semcore/icon/VideoList/m';
import Badge from '@semcore/ui/badge';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import type { ButtonLinkProps } from '@semcore/ui/button';
import React from 'react';

type ExampleProps = ButtonLinkProps & { color?: string };
const Demo = (props: ExampleProps) => {
  return (

    <Flex direction='column' gap={2} mt={10}>
      <ButtonLink
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}
      >
        ButtonLink
      </ButtonLink>

      <ButtonLink
        addonRight={VideoListM}
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}

      >
        addonRight
      </ButtonLink>

      <ButtonLink
        addonLeft={VideoListM}
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}

      >
        addonLeft
      </ButtonLink>

      <ButtonLink
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}

      >
        <ButtonLink.Text>ButtonLink.Addon</ButtonLink.Text>
        <ButtonLink.Addon>
          <VideoListM />
        </ButtonLink.Addon>
      </ButtonLink>

      <ButtonLink
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}
        addonLeft={VideoListM}
        addonRight={VideoListM}

      >
        addonLeftRight
      </ButtonLink>
      <ButtonLink
        addonLeft={VideoListM}
        size={props.size}
        active={props.active}
        disabled={props.disabled}
        use={props.use}
        color={props.color}

      >
        <ButtonLink.Text>ButtonLink with Badge</ButtonLink.Text>
        <ButtonLink.Addon>
          <Badge type='new' />
        </ButtonLink.Addon>
      </ButtonLink>

    </Flex>

  );
};

export const defaultButtonLinkProps: ExampleProps = {
  size: 100,
  use: 'primary',
  hintPlacement: 'top',
};

Demo.defaultProps = defaultButtonLinkProps;
export default Demo;
