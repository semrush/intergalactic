import type { ControlValue } from './Controls';

export type JSXProps<Props> = Props & {
  handleControlChange?: (key: keyof Props, value: ControlValue) => void;
};
