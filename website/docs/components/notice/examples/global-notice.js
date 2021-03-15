import React, { useState, useEffect } from 'react';
import Portal from '@semcore/portal';
import Notice from '@semcore/notice';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';

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
        <Notice
          hidden={!visible}
          use="primary"
          theme="light-blue"
          position="fixed"
          top={0}
          w="100%"
        >
          <Notice.Content tag={Flex} justifyContent="center">
            <Text size={100} tag="span" color="white">
              Look at this cool notice!
            </Text>
          </Notice.Content>
          <Notice.CloseIcon color="white" onClick={() => updateVisible(false)} />
        </Notice>
      </Portal>
    </>
  );
};
