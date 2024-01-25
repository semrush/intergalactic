export const isolateStyles = (node: HTMLElement) => {
  return node;

  /**
   * Styles isolation is disabled caused our components are not ready to work in shadow DOM.
   */

  // if (!document.adoptedStyleSheets) {
  //   return node;
  // }

  // node.attachShadow({ mode: 'open' });
  // const shadowRoot = node.shadowRoot!;
  // const element = document.createElement('div');
  // shadowRoot.appendChild(element);
  // const reshadowContainer = document.querySelector('#__reshadow__');
  // if (reshadowContainer) {
  //   shadowRoot.adoptedStyleSheets.push(
  //     ...[...reshadowContainer.children].map((node) => {
  //       const sheet = new CSSStyleSheet();
  //       const styleNode = node as HTMLStyleElement;
  //       const cssRules = [...(styleNode.sheet?.cssRules ?? [])];
  //       const cssText = cssRules.reduce((acc, rule) => acc + rule.cssText, '');
  //       sheet.replaceSync(cssText);
  //       return sheet;
  //     }),
  //   );
  // }

  // return element;
};
