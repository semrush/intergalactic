import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import MathPlusM from '@semcore/icon/MathPlus/m';
import CloseM from '@semcore/icon/Close/m';
import CheckM from '@semcore/icon/Check/m';
import Button from '@semcore/button';
import Input from '@semcore/input';

function isValidHex(hex: string) {
  const reg = /^#([0-9a-f]{3}){1,2}$/i;
  return reg.test('#' + hex);
}

export interface IItemProps {
  value: string;
  selectedValue: null | string;
  styles: Record<string, string>;
  onClick: (event: React.SyntheticEvent) => void;
  editable?: boolean;
  colors?: string[];
  onColorsChange?: (value: string[], event: React.SyntheticEvent) => void;
}

export interface IColorsProps {
  value: string;
  selectedValue: null | string;
  styles: Record<string, string>;
  colors: string[];
  onValueChange: (value: string, event: React.SyntheticEvent) => void;
  editable: boolean;
  onPlusButtonClick?: (event: React.SyntheticEvent) => void;
  onColorsChange?: (value: string[], event: React.SyntheticEvent) => void;
}

export interface IPlusButtonProps {
  styles: Record<string, string>;
  onClick: (event: React.SyntheticEvent) => void;
}

export interface IInputColorProps {
  styles: Record<string, string>;
  inputValue: string;
  onClick: (event: React.SyntheticEvent) => void;
  onInputValueChange: (value: string, event: React.SyntheticEvent) => void;
  colors: string[];
  onColorsChange: (value: string[], event: React.SyntheticEvent) => void;
}

export function Item(props: IItemProps) {
  const SItem = Root;
  const SItemContainer = Root;

  return sstyled(props.styles)(
    <SItemContainer render={Box} selected={props.selectedValue === props.value}>
      {props.editable && (
        <CrossIcon
          styles={props.styles}
          onClick={(event: React.SyntheticEvent) => {
            const newColors = props.colors.filter((color) => color !== props.value);
            props.onColorsChange(newColors, event);
            event.stopPropagation();
          }}
        />
      )}
      <SItem render={Box} value={props.value} />
    </SItemContainer>,
  ) as React.ReactElement;
}

function CrossIcon(props) {
  const SCrossIcon = Root;

  return sstyled(props.styles)(
    <SCrossIcon render={Box}>
      <CloseM />
    </SCrossIcon>,
  ) as React.ReactElement;
}

export function Colors(props: IColorsProps) {
  const SColors = Root;

  return sstyled(props.styles)(
    <SColors render={Box}>
      {!props.editable && (
        <WihthoutColorItem
          styles={props.styles}
          selectedValue={props.selectedValue}
          onClick={(event) => {
            props.onValueChange(null, event);
          }}
          value={props.value}
        />
      )}
      {props.colors.map((color) => (
        <Item
          {...props}
          value={color}
          key={color}
          onClick={(event) => {
            props.onValueChange(color, event);
          }}
          editable={props.editable}
          onColorsChange={props.onColorsChange}
          colors={props.colors}
        />
      ))}
      {props.editable && <PlusButton styles={props.styles} onClick={props.onPlusButtonClick} />}
    </SColors>,
  ) as React.ReactElement;
}

function WihthoutColorItem(props) {
  const SWihthoutColorItemContainer = Root;
  const SWihthoutColorItem = Root;
  const SLine = Root;

  return sstyled(props.styles)(
    <SWihthoutColorItemContainer render={Box} selected={!props.selectedValue}>
      <SWihthoutColorItem render={Box} />
      <SLine render={Box} />
    </SWihthoutColorItemContainer>,
  ) as React.ReactElement;
}

export function PlusButton(props: IPlusButtonProps) {
  const SPlusButton = Root;

  return sstyled(props.styles)(
    <SPlusButton render={Button} theme="muted" use="tertiary">
      <MathPlusM color="#6C6E79" />
    </SPlusButton>,
  ) as React.ReactElement;
}

export function InputColor(props: IInputColorProps) {
  const { inputValue, onInputValueChange, styles, colors, onColorsChange } = props;
  const [validState, setValidState] = React.useState<'normal' | 'valid' | 'invalid'>('normal');

  const SInputValue = Root;
  const SInput = Box;

  return sstyled(styles)(
    <SInput>
      <Input ml={2} w={135} state={validState}>
        <SInputValue
          render={Input.Value}
          value={inputValue}
          placeholder="FFFFFF"
          onChange={(value, event) => {
            if (isValidHex(value)) {
              setValidState('normal');
            } else {
              setValidState('invalid');
            }
            onInputValueChange(value, event);
          }}
          maxLength={6}
        />
        <Input.Addon
          role="button"
          interactive
          onClick={(event) => {
            if (inputValue.length != 0 && validState === 'normal') {
              onColorsChange(
                Array.from(new Set([...colors, `#${inputValue.toLowerCase()}`])),
                event,
              );
              onInputValueChange('', event);
            }
          }}
        >
          <CheckM color="#00C192" />
        </Input.Addon>
        <Input.Addon
          role="button"
          interactive
          onClick={(event) => {
            onInputValueChange('', event);
          }}
        >
          <CloseM />
        </Input.Addon>
      </Input>
    </SInput>,
  ) as React.ReactElement;
}
