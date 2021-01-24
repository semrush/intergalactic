/* eslint-disable */
/**
 * Converts CSS numeric value to int or returns defaultValue if
 * value is not numeric
 * @param {string} value
 * @param {number} defaultValue
 * @returns {Number|number}
 */
export default function cssToIntDefault(value: string, defaultValue: number = 0) {
  let result = parseFloat(value);
  if (Number.isNaN(result)) {
    result = defaultValue;
  }

  return Math.ceil(result);
}
