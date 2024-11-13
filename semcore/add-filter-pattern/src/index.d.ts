type AddFilterPatternProps = {
  onChange: (values: Record<string, any>) => void;
};

type FilterPatternItem = {
  visible?: boolean;
  name: string;
  displayName?: string;
  placeholder?: string;
  defaultValue: any;
};

declare const AddFilterPattern: Intergalactic.Component<'div', FilterPatternProps> & {
  FilterPatternItem: Intergalactic.Component<'div', FilterPatternItem<any, any>>;
};

export default AddFilterPattern;

export { AddFilterPattern };
