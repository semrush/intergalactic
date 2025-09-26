import { Portal, Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import type { NoticeGlobalProps } from '@semcore/notice-global';
import NoticeGlobal from '@semcore/notice-global';
import React from 'react';

type NoticeGlobalExampleProps = NoticeGlobalProps;
const Demo = (props: NoticeGlobalExampleProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Flex gap={2} alignItems='baseline'>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'Close' : 'Open'}
        {' '}
        NoticeGlobal
      </Button>
      <Portal>
        <NoticeGlobal
          hidden={!visible}
          theme={props.theme}
          duration={props.duration}
          closable={props.closable}
          onClose={() => setVisible(false)}
          position='fixed'
          top='0px'
          w='100%'
          style={{ zIndex: 9999 }}
        >
          <NoticeGlobal.Content gap={2} alignItems='center'>
            Hey! It's an example of the global notice!
            <Button theme='invert' use='primary'>
              Do something
            </Button>
            <Button theme='invert'>Don't do anything</Button>
          </NoticeGlobal.Content>
        </NoticeGlobal>
      </Portal>
    </Flex>
  );
};
export const defaultProps: NoticeGlobalExampleProps = {
  theme: 'neutral',
  duration: 0,
  closable: true,
};

Demo.defaultProps = defaultProps;
export default Demo;
