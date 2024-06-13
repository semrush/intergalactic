import React from 'react';
import Portal from 'intergalactic/portal';
import NoticeGlobal, { NoticeGlobalTheme } from 'intergalactic/notice-global';
import Button from 'intergalactic/button';
import Select from 'intergalactic/select';

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
    <>
      <Button onClick={() => setVisible(!visible)} mr={3}>
        {visible ? 'Close' : 'Open'} NoticeGlobal
      </Button>
      <Select options={options} defaultValue={defaultTheme} onChange={setTheme} />
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
    </>
  );
};
export default Demo;
