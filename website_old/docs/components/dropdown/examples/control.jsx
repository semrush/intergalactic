import React, { useState } from 'react';
import Dropdown from '@semcore/dropdown';

function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Dropdown visible={visible} onVisibleChange={(v) => setVisible(v)}>
        <Dropdown.Trigger
          style={{ background: '#FFF', border: '1px solid black', padding: '20px' }}
        >
          Attachment trigger
        </Dropdown.Trigger>
        <Dropdown.Popper style={{ padding: '20px' }}>Attached content</Dropdown.Popper>
      </Dropdown>
    </>
  );
}

export default Demo;
