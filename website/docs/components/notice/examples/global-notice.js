import React, { useState, useEffect } from 'react';
import Portal from '@semcore/portal';
import { NoticeSmart } from '@semcore/notice';
import { css } from '@semcore/core';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';

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
  }, [visible]);

  return (
    <>
      <Button onClick={() => updateVisible(!visible)}>
        {visible ? 'Close' : 'Open'} Global Notice
      </Button>
      <Portal>
        <NoticeSmart
          hidden={!visible}
          use="primary"
          theme="light-blue"
          closable
          position="fixed"
          top={0}
          w="100%"
          styles={css`
            SContent {
              text-align: center;
            }
          `}
          onClose={() => updateVisible(false)}
        >
          <Text size={200} tag="span" color="white">
            Look at this cool notice!
          </Text>
        </NoticeSmart>
      </Portal>
    </>
  );
};
