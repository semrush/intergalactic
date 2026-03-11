import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const inputDefaultVariants = {}
const inputCompoundVariants = []

const inputSlotNames = [
  [
    "root",
    "input__root"
  ],
  [
    "value",
    "input__value"
  ],
  [
    "outline",
    "input__outline"
  ],
  [
    "addon",
    "input__addon"
  ]
]
const inputSlotFns = /* @__PURE__ */ inputSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, inputDefaultVariants, getSlotCompoundVariant(inputCompoundVariants, slotName))])

const inputFn = memo((props = {}) => {
  return Object.fromEntries(inputSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const inputVariantKeys = [
  "size",
  "state",
  "disabled",
  "interactive"
]
const getVariantProps = (variants) => ({ ...inputDefaultVariants, ...compact(variants) })

export const input = /* @__PURE__ */ Object.assign(inputFn, {
  __recipe__: false,
  __name__: 'input',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: inputVariantKeys,
  variantMap: {
  "size": [
    "m",
    "l"
  ],
  "state": [
    "normal",
    "valid",
    "invalid"
  ],
  "disabled": [
    "true",
    "false"
  ],
  "interactive": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, inputVariantKeys)
  },
  getVariantProps
})