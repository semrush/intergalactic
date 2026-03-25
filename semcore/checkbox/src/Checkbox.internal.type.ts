import type { IRootComponentProps } from '@semcore/core/src';

import type { CheckboxProps } from './Checkbox.type';

export type CheckboxValueControlPropsInternal = IRootComponentProps & {
  indeterminate: CheckboxProps['indeterminate'];
  state: CheckboxProps['state'];
};

export type CheckboxValueCheckMarkPropsInternal = IRootComponentProps & {
  indeterminate: CheckboxProps['indeterminate'];
  state: CheckboxProps['state'];
  checked: CheckboxProps['checked'];
};

export type CheckboxTextPropsInternal = {
  disabled: CheckboxProps['disabled'];
  hoistDisabled: (value: boolean) => void;
  rootDisabled?: boolean;
};

export type CheckboxValuePropsInternal = {
  checked?: boolean;
};
