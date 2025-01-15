/** ============================== core ============================== */
import { createComponent, createBaseComponent } from './coreFactory';
import { sstyled } from './styled';
import { Root, Component } from './types';

export { sstyled, createComponent, createBaseComponent, Root, Component };

/** ============================= utils ============================== */

/** =========================== components =========================== */

import * as Animation from './components/animation';
import * as Breakpoints from './components/breakpoints';

export { Animation, Breakpoints };
