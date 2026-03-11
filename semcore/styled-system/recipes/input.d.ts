/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface InputVariant {
  size: "m" | "l"
state: "normal" | "valid" | "invalid"
disabled: boolean
interactive: boolean
}

type InputVariantMap = {
  [key in keyof InputVariant]: Array<InputVariant[key]>
}

type InputSlot = "root" | "value" | "outline" | "addon"

export type InputVariantProps = {
  [key in keyof InputVariant]?: ConditionalValue<InputVariant[key]> | undefined
}

export interface InputRecipe {
  __slot: InputSlot
  __type: InputVariantProps
  (props?: InputVariantProps): Pretty<Record<InputSlot, string>>
  raw: (props?: InputVariantProps) => InputVariantProps
  variantMap: InputVariantMap
  variantKeys: Array<keyof InputVariant>
  splitVariantProps<Props extends InputVariantProps>(props: Props): [InputVariantProps, Pretty<DistributiveOmit<Props, keyof InputVariantProps>>]
  getVariantProps: (props?: InputVariantProps) => InputVariantProps
}


export declare const input: InputRecipe