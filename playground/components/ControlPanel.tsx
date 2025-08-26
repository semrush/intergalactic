import Accordion from '@semcore/accordion';
import { Box } from '@semcore/base-components';
import { Text } from '@semcore/typography';
import type { PropsWithChildren } from 'react';
import React from 'react';

import BooleanControl from './Controls/BooleanControl';
import InlineRadioControl from './Controls/InlineRadioControl';
import SelectControl from './Controls/SelectControl';
import TextAreaControl from './Controls/TextAreaControl';
import TextControl from './Controls/TextControl';
import styles from '../styles/styles.module.css';
import isGroupControl from '../typeguards/isGroupControl';
import type { GroupControlType, ControlValue, ControlsType } from '../types/Controls';
import TextNumberControl from './Controls/TextNumberControl';
import type { PlaygroundComponentProps } from '../types/Playground';

type ControlsExceptGroupControl = Exclude<
  ControlsType<PlaygroundComponentProps>[keyof ControlsType<PlaygroundComponentProps>],
  GroupControlType<PlaygroundComponentProps>
>;

interface IControlWrapperProps extends PropsWithChildren {
  displayName?: string;
}

interface IGroupControlProps extends GroupControlType<PlaygroundComponentProps> {
  groupPropName: string;
  onControlChange: IControlPanelProps['onControlChange'];
}

type IBasicControlProps = ControlsExceptGroupControl & {
  onChange: (value: ControlValue) => void;
};

interface IControlPanelProps {
  controls: ControlsType<PlaygroundComponentProps>;
  onControlChange: (key: string, value: ControlValue) => void;
}

function ControlWrapper({ displayName, children }: IControlWrapperProps) {
  return displayName
    ? (
        <label style={{ display: 'contents' }}>
          <Text>{displayName}</Text>
          {children}
        </label>
      )
    : (
        children
      );
}

function GroupControl({ groupName, controls, groupPropName, onControlChange, isOpenedByDefault }: IGroupControlProps) {
  return (
    <Accordion {...(isOpenedByDefault && { defaultValue: 0 })}>
      <Accordion.Item value={0}>
        <Accordion.Item.Toggle className={styles['full-width-item']}>
          <Accordion.Item.ToggleButton>
            <Accordion.Item.Chevron mr={2} color='var(--intergalactic-icon-secondary-neutral)' />
            <Text size={200} fontWeight={500}>
              {groupName}
            </Text>
          </Accordion.Item.ToggleButton>
        </Accordion.Item.Toggle>
        <Accordion.Item.Collapse
          w='100%'
          className={styles['full-width-item']}
          role='group'
          aria-label={groupName}
          overflowHidden={false}
        >
          <Box className={styles['control-panel']}>
            {Object.entries(controls).map(([propName, controlProps]) => {
              const onChange = onControlChange.bind(null, `${propName}.${groupPropName}`);
              return <BasicControl key={propName} {...controlProps} onChange={onChange} />;
            })}
          </Box>
        </Accordion.Item.Collapse>
      </Accordion.Item>
    </Accordion>
  );
}

function BasicControl(props: IBasicControlProps) {
  const { type, displayName } = props;
  return (
    <ControlWrapper displayName={displayName}>
      {(() => {
        switch (type) {
          case 'inline-radio':
            return <InlineRadioControl {...props} />;
          case 'select':
            return <SelectControl {...props} />;
          case 'boolean':
            return <BooleanControl {...props} />;
          case 'text':
            return <TextControl {...props} />;
          case 'text-number':
            return <TextNumberControl {...props} />;
          case 'text-area':
            return <TextAreaControl {...props} />;
          default:
            return null;
        }
      })()}
    </ControlWrapper>
  );
}

function ControlPanel(props: IControlPanelProps) {
  const { controls, onControlChange } = props;

  return (
    <Box className={styles['control-panel']} role='group' aria-label='Component properties'>
      {Object.entries(controls).map(([propName, propControl]) => {
        return isGroupControl(propControl)
          ? (
              <GroupControl key={propName} {...propControl} groupPropName={propName} onControlChange={onControlChange} />
            )
          : (
              <BasicControl key={propName} {...propControl} onChange={onControlChange.bind(null, propName)} />
            );
      })}
    </Box>
  );
}

export default ControlPanel;
