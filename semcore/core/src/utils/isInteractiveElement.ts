const interactiveTags = new Set([
  'button',
  'a',
  'input',
  'select',
  'textarea',
  'details',
  'summary',
]);

const interactiveRoles = new Set([
  'button',
  'link',
  'checkbox',
  'radio',
  'combobox',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
]);

const uikitInteractive = ['Button', 'Link', 'Select', 'Dropdown', 'Tag'];

export function isInteractiveElement(element: unknown): boolean {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) return false;
  if (element.getAttribute('disabled') === 'true') return false;

  const uikitName = element.dataset.uiName;

  if (uikitName && uikitInteractive.some((interactive) => uikitName.startsWith(interactive)))
    return true;

  const tagName = element.tagName.toLowerCase();

  if (interactiveTags.has(tagName)) {
    // Special case: <a> is only interactive with href
    if (tagName === 'a') {
      return element.hasAttribute('href');
    }
    return true;
  }

  // Elements with tabindex are usually meant to be interactive
  if (element.hasAttribute('tabindex') && element.tabIndex >= 0) return true;

  // Elements with ARIA roles indicating interactivity
  const role = element.getAttribute('role');
  if (role && interactiveRoles.has(role.toLowerCase())) return true;

  return false;
}
