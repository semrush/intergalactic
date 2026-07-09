import React from 'react';

type HighlightProps = {
  highlight: string;
  children: string;
};

export function Highlight({ highlight, children }: HighlightProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    const child = document.createElement('span');

    if (highlight) {
      const regexp = new RegExp(RegExp.escape(highlight.toLowerCase()), 'ig');
      const results = [...children.matchAll(regexp)];

      let cursor = 0;

      for (const result of results) {
        const foundStr = result[0];
        const index = result.index;

        const before = children.slice(cursor, index);
        const bold = children.slice(index, index + foundStr.length);

        cursor = index + foundStr.length;

        const beforeNode = document.createTextNode(before);
        const boldNode = document.createElement('strong');
        boldNode.textContent = bold;

        child.appendChild(beforeNode);
        child.appendChild(boldNode);
      }

      if (cursor < children.length) {
        const after = children.slice(cursor);
        const afterNode = document.createTextNode(after);
        child.appendChild(afterNode);
      }
    } else {
      child.textContent = children;
    }

    ref.current?.appendChild(child);

    return () => {
      child.remove();
    };
  }, [highlight, children]);

  return <span ref={ref} />;
}
