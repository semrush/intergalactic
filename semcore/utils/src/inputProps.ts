export const inputProps = [
  'autoFocus',
  'defaultChecked',
  'checked',
  'disabled',
  'name',
  'type',
  'value',
  'defaultValue',
  'id',
  'indeterminate',
  'required',
  'onInvalid',
  'onChange',
  'onFocus',
  'onBlur',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'tabIndex',
  'data-ui-name',
];

export default function splitProps<T extends {}>(props: T, propsList: string[] = inputProps) {
  return Object.entries(props).reduce<Array<{}>>(
    (acc, [key, value]) => {
      propsList.includes(key) ? (acc[0][key] = value) : (acc[1][key] = value);
      return acc;
    },
    [{}, {}],
  );
}
