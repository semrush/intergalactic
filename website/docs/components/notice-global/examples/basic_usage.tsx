import React from 'react';
import Portal from '@semcore/portal';
import NoticeGlobal, { NoticeGlobalTheme } from '@semcore/notice-global';
import Button from '@semcore/button';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const themes = ['neutral', 'info', 'success', 'warning', 'danger'] as const;
const options = themes.map((theme) => ({
  value: theme,
  children: theme,
}));

const Demo = () => {
  const defaultTheme = 'neutral';
  const [theme, setTheme] = React.useState<NoticeGlobalTheme>(defaultTheme);
  const [visible, setVisible] = React.useState(false);

  return (
    <Flex gap={2} alignItems='baseline'>
      <Text size={200} tag='label' htmlFor='select-theme'>
        Theme
      </Text>
      <Select options={options} defaultValue={defaultTheme} onChange={setTheme} id='select-theme' />
      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'Close' : 'Open'} NoticeGlobal
      </Button>
      <Portal>
        <NoticeGlobal
          hidden={!visible}
          theme={theme}
          closable
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
export default Demo;
