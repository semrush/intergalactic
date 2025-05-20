export function getAccessibleName(element: HTMLElement | null): string {
  if (element === null) {
    return '';
  }

  return (
    getByLabelledBy(element) ??
    getByAriaLabel(element) ??
    getByLabel(element) ??
    getByTitle(element) ??
    ''
  );
}

function getByLabelledBy(element: HTMLElement): string | null {
  const ariaLabelledBy = element.getAttribute('aria-labelledby');

  if (!ariaLabelledBy) {
    return null;
  }

  const idList = ariaLabelledBy.split(/\s/);
  const result: string[] = [];

  for (const id of idList) {
    const label = document.getElementById(id);

    if (label) {
      result.push((label.textContent || '').trim());
    }
  }

  return result.join(' ');
}
function getByAriaLabel(element: HTMLElement): string | null {
  return element.getAttribute('aria-label');
}
function getByLabel(element: HTMLElement): string | null {
  const labels =
    (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) && element.labels;

  if (!labels || !labels.length) {
    return null;
  }

  const result = Array.prototype.map.call(labels, (label: HTMLLabelElement) => {
    return (label.textContent || '').trim();
  });

  return result.join(' ');
}

function getByTitle(element: HTMLElement): string | null {
  return element.title;
}
