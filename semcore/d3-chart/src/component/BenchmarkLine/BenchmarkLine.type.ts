export type BenchmarkLineProps = {
  /**
   * Level of line
   */
  level: number;

  /**
   * Theme
   * @default 'default'
   */
  theme: 'default' | 'accent';

  /**
   * Value to display
   */
  value: string | number | Date;
};
