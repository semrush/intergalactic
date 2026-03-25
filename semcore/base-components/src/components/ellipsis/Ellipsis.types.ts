type CommonEllipsisSettings = {
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

type MiddleCroppedEllipsisSettings = {
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

type EndCroppedEllipsisSettings = {
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

export type EllipsisSettings = (EndCroppedEllipsisSettings | MiddleCroppedEllipsisSettings) & CommonEllipsisSettings;

export type Events = {
  isEllipsized: (isEllipsized: boolean) => void;
};

export type TruncateOptions = {
  text?: string;
  containerWidth?: number;
  font?: string;
  direction?: 'start' | 'end';
};
