import type { PropGetterFn, Intergalactic } from '@semcore/core';

import type { NSBox, NSFlex } from '../flex-box';

declare namespace NSGrid {
  type Props = NSFlex.Props & {
    /**
     * Gutter between columns
     * @default 0
     */
    gutter?: number;
  };
  type DefaultProps = {
    gutter: 0;
  };
  type Ctx = {
    getColProps: PropGetterFn;
  };

  namespace Col {
    type Props = NSBox.Props & {
      /** Column size */
      span?: number | boolean | Array<number | boolean>;
      /** Column size on device with 1184px screen width and less */
      md?: number | boolean;
      /** Column width on device with 768px screen width and less */
      sm?: number | boolean;
      /** Column width on device with 414px screen width and less */
      xs?: number | boolean;
      /** Column offset, specified in the number of columns */
      offset?: number | Array<number>;
      /** Column offset on device with 1184px screen width and less */
      mdOffset?: number;
      /** Column offset on device with 768px screen width and less */
      smOffset?: number;
      /** Column offset on device with 414px screen width and less */
      xsOffset?: number;
      /** Column gutter, determined from Row */
      gutter?: number;
    };

    type Component = Intergalactic.Component<'div', Props, NSGrid.Props>;
  }

  type Component = Intergalactic.Component<'div', Props, Ctx> & {
    Col: Col.Component;
  };
}

/** @deprecated It will be removed in v18. */
export type ColProps = NSGrid.Col.Props;
/** @deprecated It will be removed in v18. */
export type RowProps = NSGrid.Props;
/** @deprecated It will be removed in v18. */
export type RowDefaultProps = NSGrid.DefaultProps;
/** @deprecated It will be removed in v18. */
export type GridContext = NSGrid.Ctx;
/** @deprecated It will be removed in v18. */
export type RowType = NSGrid.Component;

export type { NSGrid };
