---
title: Modal
fileSource: modal
tabs: Design('modal'), A11y('modal-a11y'), API('modal-api'), Example('modal-code'), Changelog('modal-changelog')
---

## Basic modal window usage

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  return (
    <React.Fragment>
      <Button use='primary' onClick={handleOpen}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={handleClose}>
        <Modal.Title>Do you want to save your changes?</Modal.Title>
        <Text size={200} mb={4} tag='p'>
          Your changes will be lost if you don't save them.
        </Text>
        <Button use='primary' theme='success' size='l' onClick={handleClose}>
          Save changes
        </Button>
        <Button size='l' ml={2} onClick={handleClose}>
          Don't save
        </Button>
      </Modal>
    </React.Fragment>
  );
};

</script>

:::

## Modal window height is bigger than the browser page

Sometimes the amount of content overfills the window's visibility, but you don't need to worry about it, because the component will be adjusted and the scroll will appear.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Flex } from '@semcore/ui/flex-box';

const loremSting =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus\n' +
  '          facere iste praesentium quae quia repudiandae tempore! Assumenda\n' +
  '          consequatur cum ducimus, fuga incidunt necessitatibus nulla odit\n' +
  '          placeat praesentium quidem rerum vero? Lorem ipsum dolor sit amet,\n' +
  '          consectetur adipisicing elit. Ducimus facere iste praesentium quae\n' +
  '          quia repudiandae tempore';

class Demo extends React.PureComponent {
  state = { visible: false };
  onVisibleChange = (visible) => this.setState({ visible });
  openModal = () => this.onVisibleChange(true);
  closeModal = () => this.onVisibleChange(false);

  render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Button use='primary' onClick={this.openModal}>
          Open modal
        </Button>
        <Modal visible={visible} onClose={this.closeModal} w={500}>
          <div style={{ fontSize: '16px' }}>
            {Array(6)
              .fill(0)
              .map(() => loremSting)}

            <Flex justifyContent='center' mt={8}>
              <Button use='primary' theme='success' size='l' onClick={this.closeModal}>
                Got it!
              </Button>
            </Flex>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}


</script>

:::

## Changing the alignment

By default, the modal window is centered. However, in some cases, when the content height inside the window changes dynamically and causes the modal window to "jump," it may be necessary to adjust the window alignment. This can be achieved by applying the desired margin on the respective side.

::: sandbox

<script lang="tsx">
import React, { useEffect, useState } from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';

const DEFAULT_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab atque commodi corporis culpa, eius error impedit itaque minus nemo nostrum numquam odio omnis sapiente soluta temporibus vel voluptatibus? Exercitationem?';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(DEFAULT_TEXT);
  useEffect(() => {
    const timer = setInterval(() => {
      if (text.length > 5000) {
        setText(DEFAULT_TEXT);
      } else {
        setText(text + text);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [text]);
  return (
    <React.Fragment>
      <Button use='primary' onClick={() => setVisible(true)}>
        Open modal
      </Button>
      <Modal mt={0} w={500} visible={visible} onClose={() => setVisible(false)}>
        {text}
      </Modal>
    </React.Fragment>
  );
};


</script>

:::

## Modal window inside a modal window

While it is generally not recommended, there are instances where it may be necessary to open a modal window within another modal window. In such cases, it is important to nest the modal windows properly to ensure correct background visibility and keyboard control.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [secondVisible, setSecondVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleSecondOpen = () => setSecondVisible(true);
  const handleSecondClose = () => setSecondVisible(false);

  return (
    <>
      <Button use='primary' onClick={handleOpen}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={handleClose}>
        <Text size={200} mb={3} tag='p'>
          Open one more window
        </Text>
        <Button use='primary' onClick={handleSecondOpen}>
          Open modal
        </Button>
      </Modal>
      <Modal visible={secondVisible} onClose={handleSecondClose}>
        <Text size={200} mb={3} tag='p'>
          Your changes will be lost if you don't save them.
        </Text>
        <Button use='primary' theme='success' onClick={handleSecondClose}>
          Save changes
        </Button>
        <Button ml={2} onClick={handleSecondClose}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};


</script>

:::

## Access to internal HTML nodes

To access the background or the close `Close` icon, you will need to expand the modal window and recreate the same component sequence.

In most cases, it is expected that you will not require this functionality. **There is no need for a custom `Close` icon.** Instead, consider the following solutions:

- If you need to send analytics upon clicking the close icon, you can use the [`onClose` prop](/components/modal/modal-api#IModalProps.onClose) in the Modal component.
- To ensure the spinner overlaps the close icon, refer to the example provided above.

::: sandbox

<script lang="tsx">
import React from 'react';
import Modal from '@semcore/ui/modal';
import Button from '@semcore/ui/button';

const overlayStyles = { background: 'rgba(255, 147, 253, .75)' };
const closeStyles = {
  fontSize: '20px',
};

const Demo = class Demo extends React.Component {
  state = {
    visible: false,
  };

  handleClose = () => this.setState({ visible: false });

  handleOpen = () => this.setState({ visible: true });

  render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen}>Open modal</Button>
        <Modal visible={visible} closable={false} onClose={this.handleClose}>
          <Modal.Overlay style={overlayStyles}>
            <Modal.Window wMax='400px' px={5} py={2.5}>
              <Modal.Close style={closeStyles}>x</Modal.Close>
              <h1>Lorem Title</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, autem blanditiis
                consectetur distinctio dolorem ducimus earum facere fuga laudantium magni odit
                officia porro provident quas quia sed sint voluptatum. Nesciunt!
              </p>
              <Button use='primary' theme='danger' onClick={this.handleClose}>
                Close me!
              </Button>
            </Modal.Window>
          </Modal.Overlay>
        </Modal>
      </React.Fragment>
    );
  }
}
</script>

:::

## Modal window inside the iframe

Whenever possible, opt for using pages instead of modal windows. Modal windows within an iframe will not overlay the entire viewport; instead, they will only cover a portion of the iframe area. Additionally, they will not appear at the center of the viewport but rather at the center of the iframe, resulting in an awkward visual experience.

One alternative solution is to use a [FullscreenModal](/components/fullscreen-modal/fullscreen-modal). This type of modal will cover the entire iframe and resemble a page rather than a dialog.

::: tip
It is advised to avoid using fullscreen modals for simple confirmation dialogs or warnings.
:::

When using a simple modal dialog, you can apply a quick fix to improve its appearance by setting `margin-top: 0` or `<Modal mt={0}/>`.
