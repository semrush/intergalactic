export const inputProps = [
  'autoFocus',
  'autoComplete',
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
  'inputMode',
];

type ExtractedProps<T extends object, K extends Array<keyof T>> = Partial<
  Pick<T, Extract<keyof T, K[number]>>
>;
type ExcludedProps<T extends object, K extends Array<keyof T>> = Partial<
  Pick<T, Exclude<keyof T, K[number]>>
>;

export default function getInputProps<
  T extends Partial<Record<K[number], any>>,
  K extends Array<keyof T>,
>(props: T, propsList?: K, allAriaPropsToControl?: boolean) {
  const result: [ExtractedProps<T, K>, ExcludedProps<T, K>] = [{}, {}];

  const keysToSplit = propsList || (inputProps as unknown as K);

  for (const key in props) {
    if (keysToSplit.includes(key) || (allAriaPropsToControl && key.startsWith('aria-'))) {
      result[0][key as unknown as keyof ExtractedProps<T, K>] = props[key];
    } else {
      result[1][key as unknown as keyof ExcludedProps<T, K>] = props[key];
    }
  }

  return result;
}
