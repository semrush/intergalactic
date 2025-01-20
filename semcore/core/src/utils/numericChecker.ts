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
    complete: (value: string) => COMPLETE.test(value),
    incomplete: (value: string) => INCOMPLETE.test(value),
    numOrDefault: (value: string, defaultValue = 0) =>
      COMPLETE.test(value) ? value : defaultValue,
  };
}
