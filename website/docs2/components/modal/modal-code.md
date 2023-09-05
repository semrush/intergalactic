---
title: Example
fileSource: modal
tabs: Modal('index'), A11y('modal-a11y'), API('modal-api'), Example('modal-code'), Changelog('modal-changelog')
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
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.onVisibleChange = (visible) => this.setState({ visible });
    this.openModal = () => this.onVisibleChange(true);
    this.closeModal = () => this.onVisibleChange(false);
  }
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

## Modal window with customization

Example of a modal window with a custom header.

::: sandbox

<script lang="tsx">
import React from 'react';
import Modal from '@semcore/ui/modal';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import CloseM from '@semcore/ui/icon/Close/m';
import CheckM from '@semcore/ui/icon/Check/m';
import ChevronRightM from '@semcore/ui/icon/ChevronRight/m';
import ChevronLeftM from '@semcore/ui/icon/ChevronLeft/m';
import styled from 'styled-components';

const MAP_NAVIGATION = {
  1: 'Domain settings',
  2: 'Device and Location',
  3: 'Competitors',
  4: 'Keywords',
};

const Tab = styled(Flex)`
  cursor: pointer;
  box-shadow: inset -12px 0 20px -16px rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #fff;
  &:last-child {
    border-bottom: 0;
  }
  ${({ selected }) => (selected ? 'background: #fff; color: #333;' : 'color: #fff')};
`;

const NavigationItem = ({ onClick, value, stepNavigation }) => (
  <Tab
    onClick={onClick}
    selected={value === stepNavigation}
    p='12px 10px 12px 0'
    alignItems='center'
  >
    <Flex w='40px' h='16px' inline justifyContent='center' alignItems='center'>
      {stepNavigation === value ? <CheckM /> : value}
    </Flex>
    <Text size={200}>{MAP_NAVIGATION[value]}</Text>
  </Tab>
);

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { visible: false, stepNavigation: 1 };
    this.onVisibleChange = (visible) => this.setState({ visible });
    this.closeModal = () => this.onVisibleChange(false);
    this.openModal = () => this.onVisibleChange(true);

    this.updateStepNavigation = (step) => {
      MAP_NAVIGATION[step] && this.setState({ stepNavigation: step });
    };

    this.handleItemClick = (value) => () => {
      this.setState({ stepNavigation: value });
    };
  }

  render() {
    const { visible, stepNavigation } = this.state;

    return (
      <React.Fragment>
        <Button use='primary' onClick={this.openModal}>
          Open Wizard
        </Button>
        <Modal
          visible={visible}
          onClose={this.closeModal}
          closable={false}
          p={0}
          wMax={800}
          wMin={400}
          w='100%'
        >
          <Flex
            direction='column'
            style={{
              position: 'absolute',
              top: '40px',
              left: '-160px',
              width: '160px',
              background: '#64787E',
              borderRadius: '8px 0 0 8px',
              overflow: 'hidden',
            }}
          >
            <NavigationItem
              onClick={this.handleItemClick(1)}
              value={1}
              stepNavigation={stepNavigation}
            />
            <NavigationItem
              onClick={this.handleItemClick(2)}
              value={2}
              stepNavigation={stepNavigation}
            />
            <NavigationItem
              onClick={this.handleItemClick(3)}
              value={3}
              stepNavigation={stepNavigation}
            />
            <NavigationItem
              onClick={this.handleItemClick(4)}
              value={4}
              stepNavigation={stepNavigation}
            />
          </Flex>

          <Flex
            alignItems='center'
            justifyContent='space-between'
            h={40}
            style={{
              background: '#2074b2',
              color: '#fff',
              borderRadius: '6px 6px 0 0',
            }}
          >
            <span />
            <Text size={200}>POSITION TRACKING SETTINGS</Text>
            <CloseM
              title='Close'
              onClick={() => this.closeModal()}
              mr={2}
              style={{ cursor: 'pointer' }}
            />
          </Flex>
          <Flex direction='column' p='16px 32px 32px'>
            <Text size={500}>{MAP_NAVIGATION[stepNavigation]}</Text>
            <Flex
              h='200px'
              w='100%'
              style={{ background: '#ccc' }}
              justifyContent='center'
              alignItems='center'
            >
              <Text size={500}>Content</Text>
            </Flex>
            <Flex justifyContent='space-between' mt={4}>
              <Text
                size={200}
                color='light-blue'
                style={{ cursor: 'pointer' }}
                onClick={() => this.updateStepNavigation(stepNavigation - 1)}
              >
                {MAP_NAVIGATION[stepNavigation - 1] && (
                  <ChevronLeftM mr={1} style={{ verticalAlign: 'middle' }} />
                )}
                {MAP_NAVIGATION[stepNavigation - 1]}
              </Text>

              <Text
                size={200}
                color='light-blue'
                style={{ cursor: 'pointer' }}
                onClick={() => this.updateStepNavigation(stepNavigation + 1)}
              >
                {MAP_NAVIGATION[stepNavigation + 1]}
                {MAP_NAVIGATION[stepNavigation + 1] && (
                  <ChevronRightM ml={1} style={{ verticalAlign: 'middle' }} />
                )}
              </Text>
            </Flex>
          </Flex>
        </Modal>
      </React.Fragment>
    );
  }
}
</script>

:::

## Access to internal HTML nodes

To access the background or the close `Close` icon, you will need to expand the modal window and recreate the same component sequence.

In most cases, it is expected that you will not require this functionality. **There is no need for a custom `Close` icon.** Instead, consider the following solutions:

- If you need to send analytics upon clicking the close icon, you can use the [`onClose` prop](/components/modal/modal-api/#IModalProps.onClose) in the Modal component.
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
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleClose = () => this.setState({ visible: false });
    this.handleOpen = () => this.setState({ visible: true });
  }

  render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen}>Open modal</Button>
        <Modal visible={visible} closable={false} onClose={this.handleClose}>
          <Modal.Overlay style={overlayStyles}>
            <Modal.Window wMax='400px' px={5} py={2.5}>
              <Modal.Close style={closeStyles}>🦄</Modal.Close>
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

One alternative solution is to use a [FullscreenModal](/components/fullscreen-modal). This type of modal will cover the entire iframe and resemble a page rather than a dialog.

::: tip
It is advised to avoid using fullscreen modals for simple confirmation dialogs or warnings.
:::

When using a simple modal dialog, you can apply a quick fix to improve its appearance by setting `margin-top: 0` or `<Modal mt={0}/>`.
