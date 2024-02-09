import React from 'react';
import Portal from 'intergalactic/portal';
import NoticeGlobal from 'intergalactic/notice-global';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

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
          style={{ zIndex: 9999 }}
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

export default Demo;
