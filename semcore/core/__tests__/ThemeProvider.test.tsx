import { cleanup, render } from '@semcore/testing-utils/testing-library';
import { expect, test, describe, beforeEach, vi } from '@semcore/testing-utils/vitest';
import React from 'react';

import { ThemeProvider, useContextTokens, useContextTheme } from '../src/utils/ThemeProvider';

describe('ThemeProvider', () => {
  beforeEach(cleanup);

  test('Should apply tokens as CSS custom properties', () => {
    const tokens = {
      '--intergalactic-bg-primary': '#ffffff',
      '--intergalactic-text-primary': '#191b23',
    };

    const { container } = render(
      <ThemeProvider tokens={tokens}>
        <div>Content</div>
      </ThemeProvider>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.getPropertyValue('--intergalactic-bg-primary')).toBe('#ffffff');
    expect(wrapper.style.getPropertyValue('--intergalactic-text-primary')).toBe('#191b23');
  });

  test('Should use display: contents', () => {
    const { container } = render(
      <ThemeProvider tokens={{}}>
        <div>Content</div>
      </ThemeProvider>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.display).toBe('contents');
  });

  test('Should merge with parent ThemeProvider tokens', () => {
    const parentTokens = {
      '--intergalactic-bg-primary': '#ffffff',
      '--intergalactic-text-primary': '#191b23',
    };

    const childTokens = {
      '--intergalactic-text-primary': '#000000', // Override parent
      '--intergalactic-border-primary': '#c4c7cf', // New token
    };

    const { container } = render(
      <ThemeProvider tokens={parentTokens}>
        <ThemeProvider tokens={childTokens}>
          <div data-testid='nested-child'>Content</div>
        </ThemeProvider>
      </ThemeProvider>,
    );

    // Find the nested ThemeProvider wrapper (second div)
    const parentWrapper = container.firstChild as HTMLElement;
    const childWrapper = parentWrapper.firstChild as HTMLElement;

    // Child should have merged tokens (parent + child, child overrides parent)
    expect(childWrapper.style.getPropertyValue('--intergalactic-bg-primary')).toBe('#ffffff'); // From parent
    expect(childWrapper.style.getPropertyValue('--intergalactic-text-primary')).toBe('#000000'); // Overridden by child
    expect(childWrapper.style.getPropertyValue('--intergalactic-border-primary')).toBe('#c4c7cf'); // New in child
  });

  test('Should merge provided style with token styles', () => {
    const tokens = {
      '--intergalactic-bg-primary': '#ffffff',
    };
    const customStyle = {
      padding: '10px',
      margin: '5px',
    };

    const { container } = render(
      <ThemeProvider tokens={tokens} style={customStyle}>
        <div>Content</div>
      </ThemeProvider>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.padding).toBe('10px');
    expect(wrapper.style.margin).toBe('5px');
    expect(wrapper.style.getPropertyValue('--intergalactic-bg-primary')).toBe('#ffffff');
  });

  test('Should pass through additional props', () => {
    const { container } = render(
      <ThemeProvider tokens={{}} data-testid='provider' className='custom-class' id='custom-id'>
        <div>Content</div>
      </ThemeProvider>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.getAttribute('data-testid')).toBe('provider');
    expect(wrapper.className).toBe('custom-class');
    expect(wrapper.id).toBe('custom-id');
  });
});

describe('useContextTokens', () => {
  beforeEach(cleanup);

  test('Should return null when no ThemeProvider', () => {
    let contextTokens: any;

    function TestComponent() {
      contextTokens = useContextTokens();
      return <div>Test</div>;
    }

    render(<TestComponent />);

    expect(contextTokens).toBeNull();
  });

  test('Should return tokens from ThemeProvider', () => {
    let contextTokens: any;
    const tokens = {
      '--intergalactic-bg-primary': '#ffffff',
      '--intergalactic-text-primary': '#191b23',
    };

    function TestComponent() {
      contextTokens = useContextTokens();
      return <div>Test</div>;
    }

    render(
      <ThemeProvider tokens={tokens}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(contextTokens).toEqual(tokens);
  });

  test('Should update when ThemeProvider tokens change', () => {
    let renderCount = 0;
    let contextTokens: any;

    function TestComponent() {
      contextTokens = useContextTokens();
      renderCount++;
      return <div>Test</div>;
    }

    const { rerender } = render(
      <ThemeProvider tokens={{ '--token': 'value1' }}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(contextTokens).toEqual({ '--token': 'value1' });
    const initialRenderCount = renderCount;

    rerender(
      <ThemeProvider tokens={{ '--token': 'value2' }}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(contextTokens).toEqual({ '--token': 'value2' });
    expect(renderCount).toBeGreaterThan(initialRenderCount);
  });
});

describe('useContextTheme', () => {
  beforeEach(cleanup);

  test('Should apply tokens to element ref', async () => {
    const tokens = {
      '--intergalactic-bg-primary': '#ffffff',
      '--intergalactic-text-primary': '#191b23',
    };

    function TestComponent() {
      const ref = React.useRef<HTMLDivElement>(null);
      useContextTheme(ref);

      return <div ref={ref} data-testid='themed-element'>Content</div>;
    }

    const { getByTestId } = render(
      <ThemeProvider tokens={tokens}>
        <TestComponent />
      </ThemeProvider>,
    );

    // wait for useEnhancedEffect to apply styles
    await new Promise((resolve) => setTimeout(resolve, 0));

    const element = getByTestId('themed-element');
    expect(element.style.getPropertyValue('--intergalactic-bg-primary')).toBe('#ffffff');
    expect(element.style.getPropertyValue('--intergalactic-text-primary')).toBe('#191b23');
  });

  test('Should not apply tokens when available is false', async () => {
    const tokens = { '--intergalactic-bg-primary': '#ffffff' };

    function TestComponent() {
      const ref = React.useRef<HTMLDivElement>(null);
      useContextTheme(ref, false); // available is false

      return <div ref={ref} data-testid='themed-element'>Content</div>;
    }

    const { getByTestId } = render(
      <ThemeProvider tokens={tokens}>
        <TestComponent />
      </ThemeProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const element = getByTestId('themed-element');
    // Tokens should not be applied when available is false
    expect(element.style.getPropertyValue('--intergalactic-bg-primary')).toBe('');
  });
});
