export type ControlValue = string | number | boolean;

type ControlVisibilityCondition = {
  dependsOn: string;
  equals?: ControlValue | ControlValue[];
  notEquals?: ControlValue | ControlValue[];
};

type ControlType<V> = {
  value: V;
  displayName?: string;
  visibleIf?: ControlVisibilityCondition[];
};

export type InlineRadioControlType = ControlType<string> & {
  type: 'inline-radio';
  options: string[] | ((currentValues: Record<string, string>) => string[]);
};

export type SelectControlType = ControlType<string> & {
  type: 'select';
  options: string[] | ((currentValues: Record<string, string>) => string[]);
  colorOptions?: {
    withIntergalacticPrefix: boolean;
  };
};

export type BooleanControlType = ControlType<boolean> & {
  type: 'boolean';
};

export type TextControlType = ControlType<string> & {
  type: 'text';
};

export type TextNumberControlType = ControlType<number> & {
  type: 'text-number';
  min?: number;
  max?: number;
};

export type TextAreaControlType = ControlType<string> & {
  type: 'text-area';
};

export type GroupControlType<Props extends Record<string, unknown>, K extends keyof Props = keyof Props> = {
  type: 'group';
  groupName: string;
  visibleIf?: ControlVisibilityCondition[];
  isOpenedByDefault?: boolean;
  controls: {
    [P in keyof Props[K]]:
      | InlineRadioControlType
      | SelectControlType
      | BooleanControlType
      | TextControlType
      | TextNumberControlType
      | TextAreaControlType;
  };
};

export type ControlsType<Props extends Record<string, unknown>> = {
  [P in keyof Props]:
    | InlineRadioControlType
    | SelectControlType
    | BooleanControlType
    | TextControlType
    | TextNumberControlType
    | TextAreaControlType
    | GroupControlType<Props, P>;
};
