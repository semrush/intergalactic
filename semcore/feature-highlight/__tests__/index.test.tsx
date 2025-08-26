import { render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe } from '@semcore/testing-utils/vitest';
import React, { createRef } from 'react';

import SvgSparkle from '../src/inner-components/sparkle/Sparkle';

describe('SvgSparkle', () => {
  test('Verify renders an SVG element', () => {
    const { container } = render(<SvgSparkle num={5} index={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  test('Verify forwards ref to svg element', () => {
    const ref = createRef<SVGSVGElement>();
    render(<SvgSparkle num={5} index={1} ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGElement);
  });
});
