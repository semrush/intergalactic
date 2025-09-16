export class ScoreDonutUtils {
  private readonly isSemiDonut: boolean;
  private readonly value: number;

  public readonly radius: number;

  constructor(value: number, isSemiDonut: boolean) {
    this.isSemiDonut = isSemiDonut;
    this.radius = isSemiDonut ? 9 : 10;
    this.value = value;
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

  public get separatorDash() {
    const { greyStrokeDashArray, offsetPoint, baseStrokeDashArray } = this;
    const greyStrokeDash = greyStrokeDashArray - 2 * offsetPoint;
    return `${offsetPoint} ${greyStrokeDash >= 0 ? greyStrokeDash : 0} ${offsetPoint} ${baseStrokeDashArray}`;
  }

  public get animatedSeparatorDash() {
    const { offsetPoint, baseStrokeDashArray } = this;
    return `${offsetPoint} ${baseStrokeDashArray - 2 * offsetPoint} ${offsetPoint} ${baseStrokeDashArray}`;
  }

  public get animatedSeparatorOffset() {
    const { valueStrokeDashArray, offsetPoint, baseStrokeDashArray } = this;
    return -1 * (Math.min(valueStrokeDashArray, baseStrokeDashArray - 2 * offsetPoint));
  };

  public get strokeDashOffsetBase() {
    const { valueStrokeDashArray, offsetPoint, isSemiDonut } = this;
    return -1 * (valueStrokeDashArray + (isSemiDonut ? offsetPoint : 0));
  };
}
