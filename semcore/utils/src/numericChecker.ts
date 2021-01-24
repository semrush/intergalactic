/* eslint-disable */
export default function numericChecker(float = false) {
  const FLOAT = {
    COMPLETE: /^-?(\d+)\.*(\d+)$/,
    INCOMPLETE: /^-?(\d*)?\.*$/,
  };

  const NUMBER = {
    COMPLETE: /^-?\d+$/,
    INCOMPLETE: /^-?$/,
  };

  const { COMPLETE, INCOMPLETE } = float ? FLOAT : NUMBER;
  return {
    complete: (value) => COMPLETE.test(value),
    incomplete: (value) => INCOMPLETE.test(value),
    numOrDefault: (value, defaultValue = 0) => (COMPLETE.test(value) ? value : defaultValue),
  };
}
