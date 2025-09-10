import { Portal, Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import type { NoticeGlobalTheme } from '@semcore/notice-global';
import NoticeGlobal from '@semcore/notice-global';
import { Text } from '@semcore/typography';
import React from 'react';

type noticeGlobalExampleProps = NoticeGlobalTheme;
const Demo = (props: noticeGlobalExampleProps) => {
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
          <NoticeGlobal.Content w={300} gap={2} alignItems='center'>
            Hey! It's an example of the global notice!
            Hey! It's an example of the global notice!
            Hey! It's an example of the global notice!
            <Button theme='invert' use='primary'>
              Do something
            </Button>
            <Button theme='invert'>Don't do anything</Button>
          </NoticeGlobal.Content>
          <NoticeGlobal.CloseIcon />
        </NoticeGlobal>
      </Portal>
    </Flex>
  );
};
export const defaultProps: noticeGlobalExampleProps = {
  theme: 'neutral',
  duration: 0,
  closable: true,
};

Demo.defaultProps = defaultProps;
export default Demo;
