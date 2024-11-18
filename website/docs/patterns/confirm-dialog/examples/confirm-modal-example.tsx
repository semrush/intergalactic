import React from 'react';
import Button from 'intergalactic/button';
import { Flex } from 'intergalactic/flex-box';
import Modal from 'intergalactic/modal';
import { Text, List } from 'intergalactic/typography';
import Input from 'intergalactic/input';
import Tooltip from 'intergalactic/tooltip';
import 'intergalactic/utils/style/var.css';

const warningBlockStyles = {
  background: 'var(--intergalactic-bg-secondary-critical)',
  border: '1px solid var(--intergalactic-border-critical)',
  borderRadius: 'var(--intergalactic-surface-rounded)',
  marginBottom: '24px',
  padding: '16px',
};

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [state, setState] = React.useState<'normal' | 'invalid' | 'valid'>('normal');
  const isValid = value === 'test';
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);
  const handleDelete = React.useCallback(() => {
    setFocused(true);
    setState(isValid ? 'normal' : 'invalid');
  }, [value]);

  function handlerInput(v) {
    setValue(v);
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal visible={visible} onClose={handleClose} w={536}>
        <Modal.Title mb={4}>Delete project?</Modal.Title>
        <Text size={300} mb={4} tag='p'>
          This will <Text tag='strong'>delete</Text> the following campaigns set up for{' '}
          <Text tag='strong'>test.com</Text> with all their data:
        </Text>
        <List size={300} mb={4}>
          <List.Item>Position Tracking</List.Item>
          <List.Item>Social Media Poster</List.Item>
          <List.Item>Backlink Audit</List.Item>
          <List.Item>Content Analyzer</List.Item>
        </List>
        <Flex style={warningBlockStyles} tag='label' direction='column' htmlFor='project'>
          <Text size={300} mb={2} tag='p'>
            Confirm deletion by typing the project name{' '}
            <Text tag='strong' color='red-500'>
              Test
            </Text>
          </Text>
          <Tooltip
            title='Please enter a correct project name.'
            visible={focused && !isValid}
            theme='warning'
            placement='right'
            ignorePortalsStacking
          >
            <Input size='l' state={state} w={'100%'}>
              <Input.Value
                id='project'
                placeholder='Enter project name'
                value={value}
                onChange={handlerInput}
                onBlur={() => {
                  setFocused(false);
                  setState(isValid ? 'normal' : 'invalid');
                }}
                onFocus={() => {
                  setFocused(true);
                  setState(isValid ? 'normal' : 'invalid');
                }}
              />
            </Input>
          </Tooltip>
        </Flex>
        <Button use='primary' theme='danger' size='l' onClick={handleDelete}>
          Delete
        </Button>
        <Button size='l' ml={2} onClick={handleClose}>
          Cancel
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
