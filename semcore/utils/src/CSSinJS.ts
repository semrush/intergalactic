/* eslint-disable */
import { create, NanoOptions, NanoRenderer } from 'nano-css';
import { addon as addonRule } from 'nano-css/addon/rule';
import { addon as addonCache } from 'nano-css/addon/cache';
import { addon as addonPrefixer } from 'nano-css/addon/prefixer';
import { addon as addonHydrate } from 'nano-css/addon/hydrate';

let _nano = null;

function style(opt?: NanoOptions): NanoRenderer {
  if (!_nano) {
    _nano = createStyle(opt);
  }
  return _nano;
}

function createStyle(opt: NanoOptions = {}): NanoRenderer {
  const nano = create({ pfx: 'css', verbose: true, ...opt });

  addonCache(nano);
  addonRule(nano);
  addonPrefixer(nano);
  addonHydrate(nano);

  return nano;
}

export { createStyle };

export default style;
