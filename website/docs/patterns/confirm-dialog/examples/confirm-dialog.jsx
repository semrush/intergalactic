import React from 'react';
import Button from '@semcore/ui/button';
import { Box } from '@semcore/ui/flex-box';
import Modal from '@semcore/ui/modal';
import { Text, List } from '@semcore/ui/typography';
import Input from '@semcore/ui/input';
import Tooltip from '@semcore/ui/tooltip';
import styled from 'styled-components';
import '@semcore/ui/utils/style/var.css';

const WarningBlock = styled(Box)`
  background: var(--red-50);
  border: 1px solid var(--red-200);
  border-radius: var(--rounded-m);
  margin-bottom: 24px;
  padding: 16px;
`;

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);
  const isValid = value === 'тест';
  const [touched, setTouched] = React.useState(false);

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
        <WarningBlock>
          <Text size={200} mb={4} tag="p">
            Confirm deletion by typing the project name{' '}
            <Text tag="strong" color="red-500">
              тест
            </Text>
          </Text>
          <Tooltip
            title="Please enter a correct project name."
            visible={touched && !isValid}
            theme="warning"
            placement="right"
          >
            <Input size="m" state="normal">
              <Input.Value
                placeholder="Enter project name"
                value={value}
                onChange={handlerInput}
                onBlur={() => setTouched(true)}
                onFocus={() => setTouched(false)}
              />
            </Input>
          </Tooltip>
        </WarningBlock>
        <Button use="primary" theme="danger" size="l" onClick={handleClose}>
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
