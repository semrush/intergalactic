import { defineSlotRecipe } from '@pandacss/dev';

const outlineDisabledStyle = {
  opacity: 'disabled',
  // opacity: 'var(--intergalactic-disabled-opacity, 0.3)',
  cursor: 'default',
  pointerEvents: 'none',
} as const;

export default defineSlotRecipe({
  className: 'input',
  slots: ['root', 'value', 'outline', 'addon'],
  base: {
    root: {
      'display': 'inline-flex',
      'width': '100%',
      'alignItems': 'center',
      'position': 'relative',
      'zIndex': 0,
      'verticalAlign': 'middle',
      'padding': 1,
      'boxSizing': 'border-box',

      '& input:-webkit-autofill': {
        'borderRadius': 'control',
        // borderRadius: 'var(--intergalactic-control-rounded, 6px)',
        'WebkitBoxShadow': '0 0 0 30px rgb(250, 255, 189) inset',

        '&~.input__outline': {
          backgroundColor: 'rgb(250, 255, 189)',
        },
      },
      '.input__addon': {
        '&:nth-last-child(2)': {
          marginRight: -1,
        },
      },
      '&:has(.input__value:focus-visible)': {
        zIndex: 1,
      },
    },
    value: {
      'minWidth': 0,
      'width': '100%',
      'height': '100%',
      'padding': 0,
      'border': 'none',
      'boxSizing': 'border-box',
      // color: 'var(--intergalactic-text-primary, #191b23)',
      'color': 'text-primary',
      'fontSize': 'inherit',
      'textOverflow': 'ellipsis',
      'fontFamily': 'inherit',
      'background': 'transparent',
      '_placeholder': {
        // color: 'var(--intergalactic-text-placeholder, #8a8e9b)',
        color: 'text-placeholder',
      },
      '_not': {
        _disabled: {
          _readOnly: {
            '&~.input__outline': {
              // background: 'var(--colors-control-secondary-neutral, #f4f5f9)',
              background: 'control-secondary-neutral',
            },
          },
        },
      },
      '_disabled': {
        'userSelect': 'none',
        // opacity: 'var(--intergalactic-disabled-opacity, 0.3)',
        'opacity': 'disabled',

        '&~.input__outline': {
          ...outlineDisabledStyle,
        },
      },
      '&:focus, &:focus-visible': {
        outline: 'none',
        _after: {
          outline: 'none',
        },
      },
    },
    outline: {
      position: 'absolute',
      inset: 0,
      border: '1px solid',
      // borderRadius: 'var(--intergalactic-control-rounded, 6px)',
      borderRadius: 'control',
      zIndex: -1,
      // background: 'var(--intergalactic-bg-primary-neutral, #ffffff)',
      background: 'bg-primary-neutral',
    },
    addon: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '0 0 auto',
      paddingY: 0,
      paddingX: '2x',
      height: '100%',
      color: 'icon-secondary-neutral',
    },
  },
  variants: {
    size: {
      m: {
        root: {
          // fontSize: 'var(--intergalactic-fs-200, 14px)',
          fontSize: '200',
          // height: 'var(--intergalactic-form-control-m, 28px)',
          height: 'form-control-m',
        },
        value: {
          // padding: 'var(--intergalactic-spacing-2x, 8px)',
          padding: '2x',
        },
        addon: {
          '&:not(.button)': {
            // NOTE: tokens not interpolated in shorthand properties
            // padding: '0 token("spacing.2x")',
            // paddingTop: 0,
            // paddingBottom: 0,
            // paddingLeft: '2x',
            // paddingRight: '2x',
            // paddingX: '{spacing.3x}',
            paddingX: '{spacing.2x}',
            paddingY: 0,
          },
        },
      },
      l: {
        root: {
          // fontSize: 'var(--intergalactic-fs-300, 16px)',
          fontSize: '300',
          // height: 'var(--intergalactic-form-control-l, 40px)',
          height: 'form-control-l',
        },
        value: {
          // padding: '0 var(--intergalactic-spacing-3x, 12px)',
          padding: '0 3x',
        },
      },
    },
    state: {
      normal: {
        root: {
          '& .input__outline': {
            // borderColor: 'var(--intergalactic-border-primary, #c4c7cf)',
            borderColor: 'border-primary',
            // borderColor: 'var(--colors-border-primary, #c4c7cf)',
            // borderColor: 'token(colors.gray.200)',
          },
          '_focusWithin': {
            '& .input__outline': {
              // ...focusOutline.raw(),
              focusOutline: '2px',
              outlineOffset: 0,
              transitionProperty: 'outline-color, outline-width',

              // borderColor: 'var(--intergalactic-border-info-active, #006dca)',
              borderColor: 'border-info-active',
            },
          },
        },
      },
      valid: {
        root: {
          '& .input__outline': {
            // borderColor: 'var(--intergalactic-border-success-active, #007c65)',
            borderColor: 'border-success-active',
          },
          '_focusWithin': {
            '& .input__outline': {
              // ...focusOutline.raw(),
              focusOutline: '2px',
              outlineOffset: 0,
              // outlineColor:
              //   'var(--intergalactic-keyboard-focus-valid-outline, #009f81)',
              outlineColor: 'focus-valid-outline',
              transitionProperty: 'outline-color, outline-width',

              // borderColor:
              //   'var(--intergalactic-border-success-active, #007c65)',w
              borderColor: 'border-success-active',
            },
          },
        },
      },
      invalid: {
        root: {
          '& .input__outline': {
            // borderColor: 'var(--intergalactic-border-critical-active, #d1002f)',
            borderColor: 'border-critical-active',
          },
          '_focusWithin': {
            '& .input__outline': {
              // ...focusOutline.raw(),
              focusOutline: '2px',
              outlineOffset: 0,
              // outlineColor:
              //   'var(--intergalactic-keyboard-focus-invalid-outline, #ff4953)',
              outlineColor: 'focus-invalid-outline',
              transitionProperty: 'outline-color, outline-width',

              // borderColor:
              //   'var(--intergalactic-border-critical-active, #d1002f)',
              borderColor: 'border-critical-active',
            },
          },
        },
      },
    },
    disabled: {
      true: {
        root: {
          '& .input__outline': {
            ...outlineDisabledStyle,
          },
        },
        addon: {
          opacity: 'disabled',
          cursor: 'default',
          pointerEvents: 'none',
        },
      },
      false: {},
    },
    interactive: {
      true: {
        addon: {
          cursor: 'pointer',
          _hover: {
            color: 'icon-secondary-neutral-hover-active',
          },
        },
      },
    },
    neighborLocation: {
      left: {
        value: {
          paddingLeft: 0,
        },
        outline: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 'none',
        },
      },
      right: {
        value: {
          paddingRight: 0,
        },
        outline: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
      both: {
        value: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        outline: {
          borderRadius: 0,
          borderLeft: 'none',
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'l',
      neighborLocation: 'right',
      css: {
        addon: {
          '&:not(.button)': {
            padding: '0 token("spacing.2x") 0 token("spacing.3x")',
          },
        },
      },
    },
    {
      size: 'l',
      neighborLocation: 'left',
      css: {
        addon: {
          '&:not(.button)': {
            padding: '0 token("spacing.3x") 0 token("spacing.2x")',
          },
        },
      },
    },
  ],
});
