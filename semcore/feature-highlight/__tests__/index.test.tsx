import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { expect, test, it, describe, beforeEach } from '@semcore/testing-utils/vitest';
import React, { createRef } from 'react';

import SvgSparkle from '../src/inner-components/sparkle/Sparkle';

describe('SvgSparkle', () => {
  it('renders an SVG element', () => {
    const { container } = render(<SvgSparkle num={5} index={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('forwards ref to svg element', () => {
    const ref = createRef<SVGSVGElement>();
    render(<SvgSparkle num={5} index={1} ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGElement);
  });

  it('applies aria-hidden', () => {
    const { container } = render(<SvgSparkle num={5} index={2} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders <path> inside svg', () => {
    const { container } = render(<SvgSparkle num={5} index={3} />);
    const path = container.querySelector('path');
    expect(path).toBeTruthy();
    expect(path?.getAttribute('d')).toContain('M5.371');
  });
});
