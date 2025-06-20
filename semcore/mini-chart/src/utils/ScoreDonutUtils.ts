export class ScoreDonutUtils {
  private readonly isSemiDonut: boolean;
  private readonly value: number;

  public readonly radius: number;

  constructor(value: number, isSemiDonut: boolean) {
    this.isSemiDonut = isSemiDonut;
    this.radius = isSemiDonut ? 9 : 10;
    this.value = value;
  }

  public get hasDivider() {
    return ![0, 100].includes(this.value);
  }

  public get viewBox() {
    return this.isSemiDonut ? '0 0 24 12' : '0 0 24 24';
  }

  public get strokeWidth() {
    return this.isSemiDonut ? 6 : 4;
  }

  public get baseStrokeDashArray() {
    return this.isSemiDonut ? Math.PI * this.radius : 2 * Math.PI * this.radius;
  }

  public get valueStrokeDashArray() {
    return this.baseStrokeDashArray * (this.value / 100);
  }

  public get greyStrokeDashArray() {
    return this.baseStrokeDashArray - this.valueStrokeDashArray;
  }

  public get offsetPoint() {
    return this.isSemiDonut ? this.baseStrokeDashArray / (100 / 3) : this.baseStrokeDashArray / 100;
  }

  public get strokeDashArrayParts() {
    const greyStroke = this.greyStrokeDashArray;
    const offsetPoint = this.offsetPoint;

    const greyStrokeDash = greyStroke - 2 * offsetPoint;
    const strokeDashArrayBetweenSpaces = `${greyStrokeDash} ${offsetPoint}`;

    if (this.isSemiDonut) {
      return `${offsetPoint} ${this.value < 95 ? strokeDashArrayBetweenSpaces : ''} ${this.baseStrokeDashArray}`;
    }

    return `${offsetPoint} ${greyStrokeDash >= 0 ? strokeDashArrayBetweenSpaces : ''} ${this.baseStrokeDashArray}`;
  }

  public get strokeDashOffsetBase() {
    const hasDivider = this.hasDivider;

    if (!hasDivider) return 0;

    const valueStroke = this.valueStrokeDashArray;
    const offsetPoint = this.offsetPoint;

    return -1 * (valueStroke + (this.isSemiDonut ? offsetPoint : 0));
  };
}
