import Color from 'colorjs.io';

const round = (x: number, d: number) => Math.round(x * d) / d;
const clamp = (x: number) => Math.max(0, Math.min(1, x));
const lightness = (c: Color): number => c.to('oklch').coords[0] ?? 0;

const parseColor = (raw: string): Color | null => {
  try {
    return new Color(raw).to('oklch');
  } catch {
    return null;
  }
};

function formatColor(color: Color): string {
  const oklch = color.to('oklch');
  const lR = round(oklch.coords[0] ?? 0, 1000);
  const cR = round(oklch.coords[1] ?? 0, 1000);
  const h = oklch.coords[2] ?? 0;
  const hR = isNaN(h) ? 0 : round(h, 10);
  const aR = round(oklch.alpha ?? 1, 1000);
  return aR < 1
    ? `oklch(${lR} ${cR} ${hR} / ${aR})`
    : `oklch(${lR} ${cR} ${hR})`;
}

export class ColorScale {
  private _segments: Array<{
    start: number;
    end: number;
    fn: (t: number) => Color;
  }>;

  readonly gamut: 'srgb' | 'p3';

  constructor(colors: string[], gamut: 'srgb' | 'p3' = 'srgb') {
    this.gamut = gamut;

    const stops = colors
      .flatMap((c) => {
        const parsed = parseColor(c);
        return parsed ? [parsed] : [];
      })
      .sort((a, b) => lightness(a) - lightness(b));

    if (stops.length === 0) throw new Error('No valid colors');

    const skipped = colors.length - stops.length;
    if (skipped > 0)
      throw new Error(`${skipped} color(s) could not be parsed`);

    const first = stops[0];
    const last = stops.at(-1)!;
    if (lightness(first) > 0)
      stops.unshift(new Color('oklch', [0, 0, first.coords[2] ?? 0]));
    if (lightness(last) < 1)
      stops.push(new Color('oklch', [1, 0, last.coords[2] ?? 0]));

    this._segments = stops.slice(0, -1).map((a, i) => {
      const b = stops[i + 1];
      return {
        start: lightness(a),
        end: lightness(b),
        fn: a.range(b, { space: 'oklch' }),
      };
    });
  }

  colorAt(l: number): Color {
    l = clamp(l);
    const segment =
      this._segments.find((s) => l >= s.start && l <= s.end) ??
      this._segments.at(-1)!;
    const { start, end, fn } = segment;
    const t = end === start ? 0 : (l - start) / (end - start);
    const color = fn(t);
    return color.toGamut({ method: 'css', space: this.gamut });
  }

  at(l: number): string {
    return formatColor(this.colorAt(l));
  }

  /** Return the most opaque color that looks the same as `at(l)` over white. */
  opaqueAt(l: number): string {
    return this.opaqueOver(l, 1);
  }

  /** Return the most opaque color that looks the same as `at(l)` over black. */
  opaqueInvAt(l: number): string {
    return this.opaqueOver(l, 0);
  }

  /** @param bg – background channel value: 1 for white, 0 for black */
  private opaqueOver(l: number, bg: number): string {
    const srgb = this.colorAt(l).to('srgb');
    const [r, g, b] = srgb.coords.map((v) => clamp(v ?? 0));
    const alpha = Math.max(Math.abs(r - bg), Math.abs(g - bg), Math.abs(b - bg));
    if (alpha < 1e-4) return formatColor(new Color('oklch', [bg, 0, 0]));
    const transparent = new Color('srgb', [
      (r - bg * (1 - alpha)) / alpha,
      (g - bg * (1 - alpha)) / alpha,
      (b - bg * (1 - alpha)) / alpha,
    ]);
    transparent.alpha = alpha;
    return formatColor(transparent);
  }
}
