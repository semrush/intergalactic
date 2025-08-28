import type { PlaygroundComponentName, Registry } from '../../registry';
import type { PlaygroundEntry } from '../Playground';

export type GetPropsForComponent<C extends PlaygroundComponentName> =
  Registry[C] extends PlaygroundEntry<infer Props>
    ? Props
    : never;
