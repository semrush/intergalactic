export type CommonScoreProps = {
  /**
   * Value of score (in percents from 0 to 100) or count of selected segments (for Line with segments)
   */
  value: number;

  /**
   * Color of value
   */
  color?: string;

  /**
   * Color of background
   */
  baseBgColor?: string;

  /**
   * Flag to enable skeleton
   * @default false
   */
  loading?: boolean;

  /**
   * Flag to enable animate of charts
   * @default true
   */
  animate?: boolean;
};
