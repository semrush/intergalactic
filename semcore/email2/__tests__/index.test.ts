import { convertHtml } from '../src/convertHtml';

describe('convertHtml', () => {
  test('convert custom tag', () => {
    const initialHtml = '<ig-button>Hello world</ig-button>';
    const converted = '<a>Hello world</a>';
    const result = convertHtml(initialHtml);

    expect(result).toBe(converted);
  });

  test('convert html file', () => {
    const initialHtml = '<html><head><body><ig-button>Hello world</ig-button></body></head></html>';
    const converted = '<html><head></head><body><a>Hello world</a></body></html>';
    const result = convertHtml(initialHtml);

    expect(result).toBe(converted);
  });

  test('convert html file with custom config', () => {
    const initialHtml = '<html><head><body><ig-button>Hello world</ig-button></body></head></html>';
    const converted = '<html><head></head><body><div>blobloblob</div></body></html>';
    const config = {
      'ig-button': (element, dom) => {
        const div = dom.createElement('div');
        div.innerHTML = 'blobloblob';

        return div;
      },
    };
    const result = convertHtml(initialHtml, config);

    expect(result).toBe(converted);
  });
});
