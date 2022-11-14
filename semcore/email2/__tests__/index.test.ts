import { convertHtml } from '../src/convertHtml';

describe('convertHtml', () => {
  test('convert custom tag', async () => {
    const initialHtml = '<ig-button>Hello world</ig-button>';
    const converted = '<a>Hello world</a>';
    const result = await convertHtml(initialHtml);

    expect(result).toBe(converted);
  });

  test('convert html file', async () => {
    const initialHtml = '<html><head><body><ig-button>Hello world</ig-button></body></head></html>';
    const converted = '<html><head></head><body><a>Hello world</a></body></html>';
    const result = await convertHtml(initialHtml);

    expect(result).toBe(converted);
  });

  test('convert html file with custom config', async () => {
    const initialHtml = '<html><head><body><ig-button>Hello world</ig-button></body></head></html>';
    const converted = '<html><head></head><body><div>blobloblob</div></body></html>';
    const config = {
      'ig-button': (element, dom) => {
        const div = dom.createElement('div');
        div.innerHTML = 'blobloblob';

        return div;
      },
    };
    const result = await convertHtml(initialHtml, config);

    expect(result).toBe(converted);
  });

  test('inline css styles from tag <style> and remove tag style', async () => {
    const initialHtml =
      '<html><head><style>.testClass {color: black}</style></head><body><ig-button class="testClass">Hello world</ig-button></body></html>';
    const converted =
      '<html><head></head><body><a class="testClass" style="color: black;">Hello world</a></body></html>';
    const result = await convertHtml(initialHtml);

    expect(result).toBe(converted);
  });
});
