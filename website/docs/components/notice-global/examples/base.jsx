import React, { useState, useEffect } from 'react';
import Portal from '@semcore/ui/portal';
import NoticeGlobal from '@semcore/ui/notice-global';
import { Text } from '@semcore/ui/typography';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';

export default () => {
  const [visible, updateVisible] = useState(false);

  useEffect(() => {
    const { body } = document;
    body.style.transition = 'padding-top 0.35s';
    if (visible) {
      body.style.paddingTop = '32px';
    } else {
      body.style.paddingTop = '0';
    }
    return () => {
      body.style.paddingTop = '0';
    };
  }, [visible]);

  return (
    <>
      <Button onClick={() => updateVisible(!visible)}>
        {visible ? 'Close' : 'Open'} Global Notice
      </Button>
      <Portal>
        <NoticeGlobal
          hidden={!visible}
          theme="light-blue"
          position="fixed"
          top="0px"
          w="100%"
          style={{ zIndex: '9999' }}
        >
          <NoticeGlobal.Content tag={Flex} justifyContent="center">
            <Text size={300} tag="span" color="white">
              Look at this cool notice!
            </Text>
          </NoticeGlobal.Content>
          <NoticeGlobal.CloseIcon
            interactive={false}
            color="white"
            onClick={() => updateVisible(false)}
          />
        </NoticeGlobal>
      </Portal>
    </>
  );
};
