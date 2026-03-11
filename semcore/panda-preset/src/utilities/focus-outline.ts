import { defineUtility } from '@pandacss/dev';

export default defineUtility({
  className: 'focus-outline',
  values: { type: 'string' },
  transform(offset, { token }) {
    return {
    // outlineColor: 'var(--intergalactic-keyboard-focus-outline, #008ff8)',
      // outlineColor: 'focus-outline',
      outlineColor: token('colors.focus-outline'),
      outlineStyle: 'solid',
      outlineWidth: '2px',
      outlineOffset: offset,
      // transitionDuration:
      //   'calc(var(--intergalactic-duration-extra-fast, 100) * 1ms)',
      transitionDuration: `calc(${token('durations.extra-fast')} * 1ms)`,
      transitionTimingFunction: 'ease-in-out',
      transitionProperty: 'outline-color, outline-width, outline-offset',
    };
  },
});
