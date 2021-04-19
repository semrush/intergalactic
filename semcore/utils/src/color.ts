// @ts-ignore
const COLORS = preval`
  const fs = require('fs');
  const path = require('path');
  const CSS_VARS_REG = /--[\\w+\\-]+:\\s+(#[\\w\\d]+|rgba?\\(\\d+,\\s*\\d+,\\s*\\d+(?:,\\s*(\\d+(?:\\.\\d+)?))?\\))/g;
  const cssVars = path.resolve(__dirname, '../', 'style/var.css');
  const cssVarsContent = fs.readFileSync(cssVars, 'utf8');
  const varsList = cssVarsContent.match(CSS_VARS_REG).map(cssVarDeclaration => {
    const [varName, varValue] = cssVarDeclaration.split(':');
    const colorName = varName.replace('--', '').trim();
    return { [colorName]: varValue.trim() };
  });
  module.exports = Object.assign({}, ...varsList);
`;

function shadeHexColor(color, percent) {
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

function shadeRGBColor(color, percent) {
  const [R, G, B] = colorRGB(color);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;

  return (
    'rgb(' +
    (Math.round((t - R) * p) + R) +
    ',' +
    (Math.round((t - G) * p) + G) +
    ',' +
    (Math.round((t - B) * p) + B) +
    ')'
  );
}

export function shade(color?: string, percent: number = 1) {
  if (!color) return '';
  // TODO error for color name, example 'aqua'
  if (color.length > 7) return shadeRGBColor(color, percent);
  return shadeHexColor(color, percent);
}

function blendHexColors(colorOne, colorTwo, percent) {
  const f = parseInt(colorOne.slice(1), 16),
    t = parseInt(colorTwo.slice(1), 16),
    R1 = f >> 16,
    G1 = (f >> 8) & 0x00ff,
    B1 = f & 0x0000ff,
    R2 = t >> 16,
    G2 = (t >> 8) & 0x00ff,
    B2 = t & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((R2 - R1) * percent) + R1) * 0x10000 +
      (Math.round((G2 - G1) * percent) + G1) * 0x100 +
      (Math.round((B2 - B1) * percent) + B1)
    )
      .toString(16)
      .slice(1)
  );
}

function blendRGBColors(colorOne, colorTwo, percent) {
  const [R, G, B] = colorRGB(colorOne);
  const t = colorTwo.split(',');

  return (
    'rgb(' +
    (Math.round((parseInt(t[0].slice(4)) - R) * percent) + R) +
    ',' +
    (Math.round((parseInt(t[1]) - G) * percent) + G) +
    ',' +
    (Math.round((parseInt(t[2]) - B) * percent) + B) +
    ')'
  );
}

export function blend(colorOne?: string, colorTwo?: string, percent: number = 1) {
  if (!colorOne || !colorTwo) return '';

  if (colorOne.length > 7) {
    if (colorTwo.length > 7) {
      return blendRGBColors(colorOne, colorTwo, percent);
    }
    return blendRGBColors(colorOne, `rgb(${hex2rgb(colorTwo)})`, percent);
  }
  if (colorTwo.length > 7) {
    return blendRGBColors(`rgb(${hex2rgb(colorOne).join(',')})`, colorTwo, percent);
  }
  return blendHexColors(colorOne, colorTwo, percent);
}

function colorRGB(color) {
  const f = color.split(','),
    R = parseInt(f[0].slice(4)),
    G = parseInt(f[1]),
    B = parseInt(f[2]);
  return [R, G, B];
}

function hex2rgb(hex) {
  return hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
}

export function opacity(color?: string, percent: number = 1) {
  if (!color) return '';
  if (color.includes('#')) {
    color = `rgba(${hex2rgb(color).join(', ')}, ${percent})`;
  } else if (color.includes('rgb')) {
    color = `rgba(${colorRGB(color).join(', ')}, ${percent})`;
  } else {
    color = '';
  }
  return color;
}

export function brightness(color) {
  if (!color) return '';
  if (color.length <= 7) {
    color = hex2rgb(color);
  } else {
    color = colorRGB(color);
  }
  return Math.round(
    (parseInt(color[0]) * 299 + parseInt(color[1]) * 587 + parseInt(color[2]) * 114) / 1000,
  );
}

export default function resolveColor(color?: string): string {
  if (!color) return '';
  if (color in COLORS) {
    return COLORS[color];
  }
  return color;
}
