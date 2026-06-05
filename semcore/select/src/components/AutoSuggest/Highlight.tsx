import React from 'react';

type HighlightProps = {
  highlight: string;
  children: string;
};

export function Highlight({ highlight, children }: HighlightProps) {
  let html = children;
  if (highlight) {
    try {
      const re = new RegExp(highlight.toLowerCase(), 'g');
      html = html.replace(
        re,
        `<span style="font-weight: bold; padding: var(--intergalactic-spacing-05x, 2px) 0">${highlight}</span>`,
      );
    } catch (e) {}
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
