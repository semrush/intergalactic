import React from 'react';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import Modal from '@semcore/ui/modal';
import { Text, List } from '@semcore/ui/typography';
import Input from '@semcore/ui/input';
import Tooltip from '@semcore/ui/tooltip';
import styled from 'styled-components';
import '@semcore/ui/utils/style/var.css';

const WarningBlock = styled(Flex)`
  background: var(--red-50);
  border: 1px solid var(--red-200);
  border-radius: var(--rounded-m);
  margin-bottom: 24px;
  padding: 16px;
`;

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [state, setState] = React.useState('normal');
  const isValid = value === 'тест';
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
      <Button use="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={handleClose}>
        <Text tag="h2" size={500} mb={4}>
          Delete project?
        </Text>
        <Text size={200} mb={4} tag="p">
          This will <Text tag="strong">delete</Text> the following campaigns set up for{' '}
          <Text tag="strong">test.com</Text> with all their data:
        </Text>
        <List size={200} mb={4}>
          <List.Item>Position Tracking</List.Item>
          <List.Item>Social Media Poster</List.Item>
          <List.Item>Backlink Audit</List.Item>
          <List.Item>Content Analyzer</List.Item>
        </List>
        <WarningBlock tag="label" direction="column" htmlFor="project">
          <Text size={200} mb={1} tag="p">
            Confirm deletion by typing the project name{' '}
            <Text tag="strong" color="red-500">
              тест
            </Text>
          </Text>
          <Tooltip
            title="Please enter a correct project name."
            visible={focused && !isValid}
            theme="warning"
            placement="right"
          >
            <Input size="m" state={state} w={'100%'}>
              <Input.Value
                id="project"
                placeholder="Enter project name"
                value={value}
                onChange={handlerInput}
                onBlur={() => setFocused(false)}
                onFocus={() => {
                  setFocused(true);
                  setState(isValid ? 'normal' : 'invalid');
                }}
              />
            </Input>
          </Tooltip>
        </WarningBlock>
        <Button use="primary" theme="danger" size="l" onClick={handleDelete}>
          Delete
        </Button>
        <Button size="l" ml={2} onClick={handleClose}>
          Cancel
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
