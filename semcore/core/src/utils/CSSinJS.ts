import { create, NanoOptions, NanoRenderer } from '@phytonmk/nano-css';
import { addon as addonRule } from '@phytonmk/nano-css/addon/rule';
import { addon as addonCache } from '@phytonmk/nano-css/addon/cache';
import { addon as addonPrefixer } from '@phytonmk/nano-css/addon/prefixer';
import { addon as addonHydrate } from '@phytonmk/nano-css/addon/hydrate';

let _nano: any = null;

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
