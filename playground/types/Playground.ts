import type { ControlsType } from './Controls';

export type PlaygroundComponentProps = Record<string, any>;

export type PlaygroundEntry<Props extends PlaygroundComponentProps> = {
  JSX: (props: Props) => React.JSX.Element;
  controls: ControlsType<Props>;
  link: string;
  filterProps?: string[];
  JSXDisplayName?: string;
};
