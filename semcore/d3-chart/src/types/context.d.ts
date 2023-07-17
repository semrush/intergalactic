export type Context = {
  /** Data for graphic */
  data?: unknown;
  /** Scale for svg element */
  scale?: unknown[];
};

/** @deprecated */
export default interface IContext {
  /** Data for graphic */
  /** @deprecated */
  data?: any;
  /** Scale for svg element */
  /** @deprecated */
  scale?: any[];

  [key: string]: unknown;
}
