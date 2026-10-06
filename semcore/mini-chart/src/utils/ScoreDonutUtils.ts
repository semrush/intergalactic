import { arc } from 'd3-shape';

const OUTER_RADIUS = 12;
const INNER_RADIUS = 8;
const CORNER_RADIUS = 1;
const ANIMATION_FRAMES = 60;
const MIN_ANGLE = 0.25; // rad ~14deg

export class ScoreDonutUtils {
  private readonly isSemiDonut: boolean;
  private readonly value: number;

  constructor(value: number, isSemiDonut: boolean) {
    this.isSemiDonut = isSemiDonut;
    this.value = Math.max(Math.min(value, 100), 0);
  }

  public get viewBox() {
    return this.isSemiDonut ? '0 0 24 12' : '0 0 24 24';
  }

  private get totalAngle() {
    return this.isSemiDonut ? Math.PI : 2 * Math.PI;
  }

  private get valueAngle() {
    if (this.value <= 0) return 0;
    if (this.value >= 100) return this.totalAngle;

    const angle = this.totalAngle * (this.value / 100);

    return Math.min(
      Math.max(angle, MIN_ANGLE),
      this.totalAngle - MIN_ANGLE,
    );
  }

  public get hasValue() {
    return this.value > 0;
  }

  public get hasBase() {
    return this.value < 100;
  }

  public get valuePath() {
    return arc<void>()
      .innerRadius(INNER_RADIUS)
      .outerRadius(OUTER_RADIUS)
      .startAngle(0)
      .endAngle(this.valueAngle)
      .cornerRadius(CORNER_RADIUS)
      .padAngle(0.1)() ?? '';
  }

  public get basePath() {
    return arc<void>()
      .innerRadius(INNER_RADIUS)
      .outerRadius(OUTER_RADIUS)
      .startAngle(0)
      .endAngle(this.totalAngle)
      .cornerRadius(CORNER_RADIUS)() ?? '';
  }

  private pathByAngle(angle: number) {
    return arc<void>()
      .innerRadius(INNER_RADIUS)
      .outerRadius(OUTER_RADIUS)
      .startAngle(0)
      .endAngle(angle)
      .cornerRadius(CORNER_RADIUS)
      .padAngle(0.1)();
  }

  private get animationAngles() {
    const from = 0;
    const to = this.valueAngle;

    return Array.from(
      { length: ANIMATION_FRAMES },
      (_, i) => from + (to - from) * (i / ANIMATION_FRAMES),
    );
  }

  public get valueAnimationFrames() {
    return this.animationAngles.map((angle) => this.pathByAngle(angle)).join(';');
  }
}
