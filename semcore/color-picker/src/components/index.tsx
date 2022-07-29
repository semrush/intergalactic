import React from 'react';
import { Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import { opacity } from '@semcore/utils/lib/color';
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
  displayLabel?: boolean;
  onColorsChange?: (value: string[], event: React.SyntheticEvent) => void;
}

export interface IColorsProps {
  value: string;
  selectedValue: null | string;
  styles: Record<string, string>;
  colors: string[];
  onValueChange: (value: string, event: React.SyntheticEvent) => void;
  editable: boolean;
  displayLabel: boolean;
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
  const { styles, selectedValue, value, onColorsChange, colors, displayLabel, editable } = props;
  const SItem = Root;
  const SItemContainer = Root;
  const SLabel = Root;

  return sstyled(styles)(
    <SItemContainer render={Box} selected={selectedValue === value}>
      {editable && (
        <CrossIcon
          styles={styles}
          onClick={(event: React.SyntheticEvent) => {
            const newColors = colors.filter((color) => color !== value);
            onColorsChange(newColors, event);
            event.stopPropagation();
            event.preventDefault();
          }}
        />
      )}
      <SItem
        render={Box}
        value={value}
        displayLabel={displayLabel}
        lightBackground={opacity(value, 0.15)}
      >
        {displayLabel && (
          <SLabel>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill={value}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.61769 10C7.51308 9.65368 7.3942 9.29774 7.26106 8.93218C7.13742 8.56662 7.01379 8.20106 6.89016 7.8355H3.03852C2.91488 8.20106 2.7865 8.56662 2.65335 8.93218C2.52972 9.29774 2.4156 9.65368 2.31098 10H0C0.370899 8.92256 0.722777 7.92689 1.05563 7.01299C1.38849 6.09909 1.71184 5.2381 2.02568 4.43001C2.34903 3.62193 2.66286 2.85714 2.96719 2.13564C3.28103 1.40452 3.60437 0.69264 3.93723 0H6.06277C6.38612 0.69264 6.70471 1.40452 7.01855 2.13564C7.33238 2.85714 7.64622 3.62193 7.96006 4.43001C8.28341 5.2381 8.61151 6.09909 8.94436 7.01299C9.27722 7.92689 9.6291 8.92256 10 10H7.61769ZM4.95007 2.26551C4.90252 2.40981 4.83119 2.60702 4.73609 2.85714C4.64099 3.10726 4.53162 3.39586 4.40799 3.72294C4.28436 4.05002 4.14646 4.41077 3.99429 4.8052C3.85164 5.19962 3.70423 5.61328 3.55207 6.04618H6.36234C6.21018 5.61328 6.06277 5.19962 5.92011 4.8052C5.77746 4.41077 5.63956 4.05002 5.50642 3.72294C5.38279 3.39586 5.27342 3.10726 5.17832 2.85714C5.08321 2.60702 5.00713 2.40981 4.95007 2.26551Z"
                fill={value}
              />
            </svg>
          </SLabel>
        )}
      </SItem>
    </SItemContainer>,
  ) as React.ReactElement;
}

function CrossIcon(props) {
  const { styles } = props;
  const SCrossIcon = Root;

  return sstyled(styles)(
    <SCrossIcon render={Box}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="12" height="12" rx="6" fill="white" />
        <path
          d="M8.73316 3.26684C9.08895 3.62263 9.08895 4.19948 8.73316 4.55526L7.28842 6L8.73316 7.44474C9.08895 7.80052 9.08895 8.37737 8.73316 8.73316C8.37737 9.08895 7.80052 9.08895 7.44474 8.73316L6 7.28842L4.55526 8.73316C4.19948 9.08895 3.62263 9.08895 3.26684 8.73316C2.91105 8.37737 2.91105 7.80052 3.26684 7.44473L4.71158 6L3.26684 4.55527C2.91105 4.19948 2.91105 3.62263 3.26684 3.26684C3.62263 2.91105 4.19948 2.91105 4.55526 3.26684L6 4.71158L7.44474 3.26684C7.80052 2.91105 8.37737 2.91105 8.73316 3.26684Z"
          fill="#6C6E79"
        />
      </svg>
    </SCrossIcon>,
  ) as React.ReactElement;
}

export function Colors(props: IColorsProps) {
  const {
    styles,
    editable,
    selectedValue,
    onValueChange,
    value,
    colors,
    onColorsChange,
    displayLabel,
    onPlusButtonClick,
  } = props;
  const SColors = Root;

  return sstyled(styles)(
    <SColors render={Box}>
      {!editable && (
        <WihthoutColorItem
          styles={styles}
          selectedValue={selectedValue}
          onClick={(event: React.SyntheticEvent) => {
            onValueChange(null, event);
          }}
          value={value}
        />
      )}
      {colors.map((color) => (
        <Item
          {...props}
          value={color}
          key={color}
          onClick={(event: React.SyntheticEvent) => {
            onValueChange(color, event);
          }}
          editable={editable}
          onColorsChange={onColorsChange}
          colors={colors}
          displayLabel={displayLabel}
        />
      ))}
      {editable && <PlusButton styles={styles} onClick={onPlusButtonClick} />}
    </SColors>,
  ) as React.ReactElement;
}

function WihthoutColorItem(props) {
  const { selectedValue, styles } = props;
  const SWihthoutColorItemContainer = Root;
  const SWihthoutColorItem = Root;
  const SLine = Root;

  return sstyled(styles)(
    <SWihthoutColorItemContainer render={Box} selected={!selectedValue}>
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
      <Input ml={1} w={135} state={validState}>
        <SInputValue
          render={Input.Value}
          value={inputValue}
          placeholder="FFFFFF"
          onChange={(value, event) => {
            if (value.length !== 0) {
              if (isValidHex(value)) {
                setValidState('normal');
              } else {
                setValidState('invalid');
              }
            } else {
              setValidState('normal');
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
          p="0"
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
