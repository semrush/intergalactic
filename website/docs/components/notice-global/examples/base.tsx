import React, { useState } from 'react';
import Portal from '@semcore/ui/portal';
import NoticeGlobal from '@semcore/ui/notice-global';
import { Text } from '@semcore/ui/typography';
import { Flex } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'Close' : 'Open'} NoticeGlobal
      </Button>
      <Portal>
        <NoticeGlobal
          hidden={!visible}
          theme='info'
          position='fixed'
          top='0px'
          w='100%'
          style={{ zIndex: '9999' }}
        >
          <NoticeGlobal.Content tag={Flex} justifyContent='center'>
            <Text size={300} tag='span' color='white'>
              Hey! It's an example of the global notice!
            </Text>
          </NoticeGlobal.Content>
          <NoticeGlobal.CloseIcon
            interactive={false}
            color='white'
            onClick={() => setVisible(false)}
          />
        </NoticeGlobal>
      </Portal>
    </>
  );
};
