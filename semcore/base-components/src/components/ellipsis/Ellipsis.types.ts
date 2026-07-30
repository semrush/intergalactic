declare namespace NSEllipsis {
  type CommonCropSettings = {
  /**
   * Common container element for few ellipsises for improve performance.
   */
    containerElement?: HTMLElement;

    /**
   * Function for crop or increase a container width. For example, for tables with accordion
   */
    recalculateContainerWidth?: (width: number) => number;

    /**
   * Flag to enable observing changes in cropped texts.
   * @default false
   */
    observeChildrenMutations?: boolean;
  };
  type MiddleCropSettings = {
  /**
   * Crop position
   * @default end
   */
    cropPosition: 'middle';

    maxLine?: never;

    /**
   * Count of last symbols which shouldn't be cropped.
   */
    lastRequiredSymbols?: number;
  };
  type EndCropSettings = {
  /**
   * Crop position
   * @default end
   */
    cropPosition?: 'end';
    /**
   * Lines count in multiline Ellipsis.
   * Applies only for `cropPosition = 'end'`
   * @default 1
   */
    maxLine?: number;

    lastRequiredSymbols?: never;
  };
  type Settings = (NSEllipsis.EndCropSettings | NSEllipsis.MiddleCropSettings) & CommonCropSettings;
  type Events = {
    isEllipsized: (isEllipsized: boolean) => void;
  };
  type TruncateOptions = {
    text?: string;
    containerWidth?: number;
    font?: string;
    direction?: 'start' | 'end';
  };
}

/** @deprecated It will be removed in v19. */
export type EllipsisSettings = NSEllipsis.Settings;

export type { NSEllipsis };
