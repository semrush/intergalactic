function shadeHexColor(color: string, percent: number) {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`;
}

function shadeRGBColor(color: string, percent: number) {
  const [R, G, B] = colorRGB(color);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;

  return `rgb(${Math.round((t - R) * p) + R},${Math.round((t - G) * p) + G},${
    Math.round((t - B) * p) + B
  })`;
}

export function shade(color?: string, percent = 1) {
  if (!color) return;
  // TODO error for color name, example 'aqua'
  if (color.length > 7) return shadeRGBColor(color, percent);
  return shadeHexColor(color, percent);
}

function blendHexColors(colorOne: string, colorTwo: string, percent: number) {
  const f = parseInt(colorOne.slice(1), 16);
  const t = parseInt(colorTwo.slice(1), 16);
  const R1 = f >> 16;
  const G1 = (f >> 8) & 0x00ff;
  const B1 = f & 0x0000ff;
  const R2 = t >> 16;
  const G2 = (t >> 8) & 0x00ff;
  const B2 = t & 0x0000ff;
  return `#${(
    0x1000000 +
    (Math.round((R2 - R1) * percent) + R1) * 0x10000 +
    (Math.round((G2 - G1) * percent) + G1) * 0x100 +
    (Math.round((B2 - B1) * percent) + B1)
  )
    .toString(16)
    .slice(1)}`;
}

function blendRGBColors(colorOne: string, colorTwo: string, percent: number) {
  const [R, G, B] = colorRGB(colorOne);
  const t = colorTwo.split(',');

  return `rgb(${Math.round((parseInt(t[0].slice(4)) - R) * percent) + R},${
    Math.round((parseInt(t[1]) - G) * percent) + G
  },${Math.round((parseInt(t[2]) - B) * percent) + B})`;
}

export function blend(colorOne?: string, colorTwo?: string, percent = 1) {
  if (!colorOne || !colorTwo) return;

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

function colorRGB(color: string) {
  const f = color.split(',');
  const R = parseInt(f[0].slice(4));
  const G = parseInt(f[1]);
  const B = parseInt(f[2]);
  return [R, G, B];
}

function hex2rgb(hex: string) {
  return hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16))!;
}

export function opacity(color?: string, percent = 1) {
  if (!color) return;
  if (color.includes('#') && color.match(/^#?[a-fA-F\d]{6}$/)) {
    color = `rgba(${hex2rgb(color).join(', ')}, ${percent})`;
  } else if (color.includes('rgb')) {
    color = `rgba(${colorRGB(color).join(', ')}, ${percent})`;
  } else {
    return;
  }
  return color;
}

export function brightness(color: any) {
  if (!color) return;
  if (color.length <= 7) {
    color = hex2rgb(color);
  } else {
    color = colorRGB(color);
  }
  return Math.round(
    (parseInt(color[0]) * 299 + parseInt(color[1]) * 587 + parseInt(color[2]) * 114) / 1000,
  );
}

const lightMemo: { [input: string]: string } = {};
export const light = (color?: string, factor = 1) => {
  if (!color) return;
  const inputKey = `${color}_${factor}`;
  if (lightMemo[inputKey]) return lightMemo[inputKey];

  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;
  if (color.startsWith('#')) {
    if (color.length !== 4 && color.length !== 7) {
      throw new Error(`Got invalid color ${color}`);
    }
    const partSize = color.length === 4 ? 1 : 2;
    r = parseInt(color.substring(1, 1 + partSize), 16);
    g = parseInt(color.substring(1 + partSize, 1 + partSize * 2), 16);
    b = parseInt(color.substring(1 + partSize * 2, 1 + partSize * 3), 16);
    a = 1; // not handled for now
  } else if (color.startsWith('rgb(')) {
    const trimmed = color.substring('rgb('.length, color.length - ')'.length);
    const parts = trimmed.split(',').map((part) => parseInt(part.trim(), 10));
    r = parts[0];
    g = parts[1];
    b = parts[2];
    a = 1;
  } else if (color.startsWith('rgba(')) {
    const trimmed = color.substring('rgba('.length, color.length - ')'.length);
    const parts = trimmed.split(',').map((part) => parseInt(part.trim(), 10));
    r = parts[0];
    g = parts[1];
    b = parts[2];
    a = parts[2];
  } else {
    throw new Error(`Got invalid color ${color}`);
  }

  const hsl = rgbToHsl(r, g, b);

  hsl[2] += (1 - hsl[2]) * factor;

  const rgb = hslToRgb(...hsl);

  return lightMemo[inputKey] === `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h! /= 6;
  }

  return [h, s, l] as [h: number, s: number, l: number];
};

const hslToRgb = (h: number, s: number, l: number) => {
  let r = 0;
  let g = 0;
  let b = 0;

  if (s === 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255] as [r: number, g: number, b: number];
};
