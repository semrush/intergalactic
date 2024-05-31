import React from 'react';
import Portal from 'intergalactic/portal';
import NoticeGlobal from 'intergalactic/notice-global';
import Button from 'intergalactic/button';
import Select from 'intergalactic/select';

const Demo = () => {
  const defaultTheme = 'neutral';
  const [theme, setTheme] = React.useState(defaultTheme);
  const [visible, setVisible] = React.useState(false);
  const themes = ['neutral', 'info', 'success', 'warning', 'danger'];
  const options = themes.map((x) => ({
    value: x,
    children: x,
  }));

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'Close' : 'Open'} NoticeGlobal
      </Button>
      <Select options={options} defaultValue={defaultTheme} onChange={setTheme} ml={3} />
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
