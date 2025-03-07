import { expect, test, describe } from '@semcore/testing-utils/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Animation } from '../src';

describe('Animation Component', () => {
  test('should not render when visible is false and preserveNode is false', () => {
    render(
      <Animation visible={false} preserveNode={false}>
        Content
      </Animation>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('should preserve node when preserveNode is true', () => {
    render(
      <Animation visible={false} preserveNode={true}>
        Content
      </Animation>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
