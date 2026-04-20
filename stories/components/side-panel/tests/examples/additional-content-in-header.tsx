import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false);
  const [withEllipsis, setWithEllipsis] = React.useState(false);

  const [dynamicText] = React.useState(
    'Elegant proof of Fermat\'s last theorem that the narrow margins cannot contain',
  );

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show side panel</Button>

      <SidePanel visible={visible} onClose={() => setVisible(false)}>
        <SidePanel.Panel>
          <SidePanel.Close />

          <SidePanel.Header>
            <SidePanel.Back>Back</SidePanel.Back>

            <SidePanel.Title>
              <Text>Static text: </Text>
              <Text use='secondary' ellipsis={withEllipsis} w={80}>{dynamicText}</Text>
            </SidePanel.Title>

            <div>
              <div>Additional element 1</div>
              <div>Additional element 2</div>
            </div>
          </SidePanel.Header>

          <SidePanel.Body>
            <div style={{ marginTop: '100px' }}>
              <label>
                <input
                  type='checkbox'
                  checked={withEllipsis}
                  onChange={(e) => setWithEllipsis((s) => !s)}
                />
                with Ellipsis
              </label>
            </div>
          </SidePanel.Body>
        </SidePanel.Panel>
      </SidePanel>
    </>
  );
}
