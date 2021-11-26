/*__semcore-vars__:"./var.css"*/

/* @ts-ignore */
var COLORS = {
  cyan: '#00b0ed',
  green: '#000000',
};

function resolveColor(color) {
  if (!color) return '';

  if (color in COLORS) {
    return COLORS[color];
  }

  return color;
}