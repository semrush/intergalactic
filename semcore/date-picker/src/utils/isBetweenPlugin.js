/**
 * Plugin is copied from dayjs plugins because of build in both esm and commonjs.
 * See https://github.com/iamkun/dayjs/tree/dev/src/plugin/isBetween
 */

export default (function (o, c, d) {
  c.prototype.isBetween = function (a, b, u, i) {
    const dA = d(a);
    const dB = d(b);
    i = i || '()';
    const dAi = i[0] === '(';
    const dBi = i[1] === ')';
    return (
      ((dAi ? this.isAfter(dA, u) : !this.isBefore(dA, u)) &&
        (dBi ? this.isBefore(dB, u) : !this.isAfter(dB, u))) ||
      ((dAi ? this.isBefore(dA, u) : !this.isAfter(dA, u)) &&
        (dBi ? this.isAfter(dB, u) : !this.isBefore(dB, u)))
    );
  };
});
