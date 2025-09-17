import { Box, Flex } from '@semcore/base-components';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import React, { useContext } from 'react';

import type { SelectControlType } from '../../types/Controls';
import { ThemeContext } from '../ThemeContext';

interface ISelectControlProps extends SelectControlType {
  onChange: (value: string) => void;
}

interface ISelectColorAddonProps {
  options: Required<SelectControlType['colorOptions']>;
  color: string;
}

function SelectColorAddon({ options, color }: ISelectColorAddonProps) {
  if (!options) return null;

  const theme = useContext(ThemeContext);
  const ref = React.useRef<null | HTMLDivElement>(null);
  const { withIntergalacticPrefix } = options;
  const bgColor = withIntergalacticPrefix ? `var(--intergalactic-${color})` : `var(--${color})`;

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const computedStyle = window.getComputedStyle(element);
    const resolvedColor = computedStyle.getPropertyValue('background-color');

    if (isColorWhite(resolvedColor) && theme === 'light') {
      element.style.border = '1px solid var(--intergalactic-border-primary)';
    }
  }, [theme]);

  return (
    <div
      ref={ref}
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: bgColor,
      }}
    />
  );
}

function SelectControl({ options, value, colorOptions, onChange, displayName }: ISelectControlProps) {
  if (!Array.isArray(options)) return null;

  return (
    <Box tag='label' display='contents'>
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
    </Box>
  );
}

export default SelectControl;

function isColorWhite(color: string) {
  const lowerCaseColor = color.toLowerCase();

  if (lowerCaseColor === '#ffffff' || lowerCaseColor === '#fff') {
    return true;
  }

  const rgbRegex = /rgba?\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*)(,\s*1\s*)?\)/;
  const rgbMatch = lowerCaseColor.match(rgbRegex);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch[1].split(',').map(Number);
    return r === 255 && g === 255 && b === 255;
  }

  if (lowerCaseColor === 'white') {
    return true;
  }

  return false;
}
