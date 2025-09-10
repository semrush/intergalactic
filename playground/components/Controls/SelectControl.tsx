import { Flex } from '@semcore/base-components';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import React from 'react';

import type { SelectControlType } from '../../types/Controls';

interface ISelectControlProps extends SelectControlType {
  onChange: (value: string) => void;
}

interface ISelectColorAddonProps {
  options: Required<SelectControlType['colorOptions']>;
  color: string;
}

function SelectColorAddon({ options, color }: ISelectColorAddonProps) {
  if (!options) return null;

  const { withIntergalacticPrefix } = options;

  return (
    <div
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: withIntergalacticPrefix ? `var(--intergalactic-${color})` : `var(--${color})`,
      }}
    />
  );
}

function SelectControl({ options, value, colorOptions, onChange, displayName }: ISelectControlProps) {
  if (!Array.isArray(options)) return null;

  return (
    <label style={{ display: 'contents' }}>
      <Text mt={1}>{displayName}</Text>
      <Select value={value} w='100%' onChange={onChange}>
        <Select.Trigger w='100%'>
          {colorOptions && (
            <Select.Trigger.Addon>
              <SelectColorAddon options={colorOptions} color={`${value}`} />
            </Select.Trigger.Addon>
          )}
          <Select.Trigger.Text>{value}</Select.Trigger.Text>
        </Select.Trigger>
        <Select.Menu>
          {options.map((option) => (
            <Select.Option key={option} value={option}>
              <Flex alignItems='center' gap={2}>
                <SelectColorAddon options={colorOptions} color={`${option}`} />
                {option}
              </Flex>
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
    </label>
  );
}

export default SelectControl;
