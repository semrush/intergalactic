import { interpolateValue } from '@semcore/ui/d3-chart';

export default {
  Default: {
    Cats: 3524,
    Dogs: 1344,
    Capybaras: 6135,
    Hamsters: 1456,
    Birds: 1823,
  },
  EdgeCase: {
    Cats: 3524,
    Dogs: interpolateValue,
    Capybaras: 6135,
    Hamsters: 0,
    Birds: 1823,
  },
};
