---
title: SidePanel
fileSource: side-panel
tabs: Design('side-panel'), A11y('side-panel-a11y'), API('side-panel-api'), Example('side-panel-code'), Changelog('side-panel-changelog')
---

## Basic example

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import { List } from '@semcore/ui/typography';
import SidePanel from '@semcore/ui/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} mt={20}>
        <List size={300} marker={null}>
          {['Features', 'Pricing', 'Resources', 'Company', 'Extra tools'].map((name, i, arr) => (
            <React.Fragment key={i}>
              <List.Item>{name}</List.Item>
              {i < arr.length - 1}
            </React.Fragment>
          ))}
        </List>
      </SidePanel>
    </React.Fragment>
  );
};
</script>

:::

## Advanced example

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} mt={20}>
        <SidePanel.Close />
        <SidePanel.Header>
          <SidePanel.Back>Go to Tool Name</SidePanel.Back>
          <SidePanel.Title>Heading 6, 16px</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>Content</SidePanel.Body>
        <SidePanel.Footer justifyContent='center' pt={2}>
          <Button use='primary'>Primary</Button>
          <Button ml={2}>Cancel</Button>
        </SidePanel.Footer>
      </SidePanel>
    </>
  );
};
</script>

:::

## Access to internal components

You can access the internal components by expanding `SidePanel` for `SidePanel.Overlay`, `SidePanel.Panel` or `SidePanel.Close`.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import SidePanel from '@semcore/ui/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel closable={false} visible={visible} onClose={() => setVisible(false)}>
        <SidePanel.Overlay>
          <SidePanel.Panel mt={20}>
            <SidePanel.Close />
            <Text size={300} tag='p'>
              Waba-laba-dub-dub!
              <Button mt={3}>I'm just a button</Button>
            </Text>
          </SidePanel.Panel>
        </SidePanel.Overlay>
      </SidePanel>
    </React.Fragment>
  );
};
</script>

:::

## Placement

The component is supplied with three positioning options.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import Select from '@semcore/ui/select';
import SidePanel, { SidePanelPlacement } from '@semcore/ui/side-panel';

const placements: SidePanelPlacement[] = ['left', 'right', 'bottom'];

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState(placements[1]);

  return (
    <React.Fragment>
      <Text size={300} tag='div' mb={2}>
        Placement:
      </Text>
      <Select
        value={placement}
        options={arrToOptions(placements)}
        onChange={setPlacement}
        size='l'
      />
      <Button onClick={() => setVisible(true)} use='primary' theme='success' size='l' ml={3}>
        Show SidePanel
      </Button>
      <SidePanel
        visible={visible}
        onClose={() => setVisible(false)}
        placement={placement}
        mt={placement === 'bottom' ? 0 : 20}
      >
        <Text size={300} tag='p'>
          Waba-laba-dub-dub!
        </Text>
        <Button mt={3}>I'm just a button</Button>
      </SidePanel>
    </React.Fragment>
  );
};

function arrToOptions(arr) {
  return arr.map((i) => ({ value: i, label: i, children: i }));
}
</script>

:::

## Disabling overlay

By default, the component is rendered with an overlay, but you can change this by not passing it.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import SidePanel from '@semcore/ui/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)}>
        <SidePanel.Panel mt={20}>
          <Text size={300} tag='p'>
            Waba-laba-dub-dub!
            <Button mt={3}>I'm just a button</Button>
          </Text>
        </SidePanel.Panel>
      </SidePanel>
    </React.Fragment>
  );
};
</script>

:::

## Portals

By default, the component is rendered to the portal, at the bottom of the body. You can redefine this behavior with [`PortalProvider`](/utils/portal/portal) and disable it with `disablePortal`.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import SidePanel from '@semcore/ui/side-panel';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>Show SidePanel</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} disablePortal>
        <SidePanel.Panel mt={20}>
          <Text size={300} tag='p'>
            Waba-laba-dub-dub!
          </Text>
          <Button mt={3}>I'm just a button</Button>
        </SidePanel.Panel>
      </SidePanel>
    </React.Fragment>
  );
};
</script>

:::

## Iframe

**We recommend not using this component inside an iframe.** Instead, use [modal window](/components/modal/modal) or [dropdown](/components/dropdown/dropdown).
