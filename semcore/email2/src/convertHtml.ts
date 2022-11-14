import jsdom from 'jsdom';
import inlineCss from 'inline-css';
import { componentsConfig } from '../src/componentsConfig';

export async function convertHtml(html: string, customConfig?: {}) {
  const options = {
    url: '/',
    // extraCss: css,
    preserveMediaQueries: true,
    applyStyleTags: true,
    applyLinkTags: false,
  };
  const inlinedHtml = await inlineCss(html, options).then(function (html) {
    return html;
  });
  const { JSDOM } = jsdom;
  const dom = new JSDOM(inlinedHtml.toString());
  const commonConfig = { ...componentsConfig, ...customConfig };
  const tags = Object.keys(commonConfig);
  const isNeedBaseHtml = html.includes('<html>');

  for (let j = 0; j < tags.length; j++) {
    const allElements = dom.window.document.querySelectorAll(tags[j]);

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const elementName = element.tagName.toLowerCase();
      const newElement = commonConfig[elementName](element, dom.window.document);
      element.replaceWith(newElement);
    }
  }

  const convertedHtml = isNeedBaseHtml
    ? dom.window.document.documentElement.outerHTML
    : dom.window.document.body.children[0].outerHTML;

  return convertedHtml;
}
