import { getAttrs, setAttrs } from './utils';

export const componentsConfig = {
  'ig-button': (element, dom) => {
    const a = dom.createElement('a');
    const attrs = getAttrs(element);

    setAttrs(a, attrs);

    a.innerHTML = element.innerHTML;

    return a;
  },
};
