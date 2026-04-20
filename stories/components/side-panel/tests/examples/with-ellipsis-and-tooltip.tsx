import FileExportM from '@semcore/icon/FileExport/m';
import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import Tooltip from '@semcore/ui/tooltip';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} aria-label='My side panel'>
        <SidePanel.Header>
          <SidePanel.Back>Go to Tool Name</SidePanel.Back>
          <SidePanel.Title w={100} ellipsis={true}>Heading 6, 16px Heading 6, 16px</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>
          Content

          <Tooltip
            title='Default tooltip contains short text explaining something about the trigger.'
            tag={Button}
            aria-label='Export to PDF'
            addonLeft={FileExportM}
          />

        </SidePanel.Body>
        <SidePanel.Footer justifyContent='center' pt={2}>
          <Button use='primary'>Primary</Button>
          <Button ml={2}>Cancel</Button>
        </SidePanel.Footer>
      </SidePanel>
    </>
  );
};

export default Demo;
