import { getAttrs, setAttrs } from './src/utils';

const componentsConfig = {
  'ig-button': (element, dom) => {
    const a = dom.createElement('div');
    const attrs = getAttrs(element);

    setAttrs(a, attrs);

    a.innerHTML = 'blobloblob';

    return a;
  },
};

export default componentsConfig;
