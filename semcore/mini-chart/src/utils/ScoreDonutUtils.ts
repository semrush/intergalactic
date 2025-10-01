export class ScoreDonutUtils {
  private readonly isSemiDonut: boolean;
  private readonly value: number;

  public readonly radius: number;

  constructor(value: number, isSemiDonut: boolean) {
    this.isSemiDonut = isSemiDonut;
    this.radius = isSemiDonut ? 9 : 10;
    this.value = Math.max(Math.min(value, 100), 0);
  }

  public get viewBox() {
    return this.isSemiDonut ? '0 0 24 12' : '0 0 24 24';
  }

  public get strokeWidth() {
    return this.isSemiDonut ? 6 : 4;
  }

  public get fullLength() {
    return this.isSemiDonut ? Math.PI * this.radius : 2 * Math.PI * this.radius;
  }

  public get point() {
    return this.isSemiDonut
      ? this.fullLength / (100 / 3)
      : this.fullLength / 100;
  }

  public get valueLength() {
    return this.fullLength * (this.value / 100);
  }

  public get animatedValueLength() {
    return Math.min(this.valueLength, this.fullLength - this.startMargin - this.endMargin);
  }

  public get startMargin() {
    let margin = 0;
    if (this.value > 0) margin = this.point;
    return margin;
  }

  public get endMargin() {
    let margin = 0;
    if (!this.isSemiDonut && this.value > 0) margin = this.point;
    return margin;
  }

  public get baseOffset() {
    return -1 * (this.valueLength + this.startMargin);
  };

  public get baseLength() {
    return Math.max(this.fullLength - this.valueLength - this.startMargin - this.endMargin, 0);
  }

  public get animatedBaseLengthFrom() {
    return this.fullLength - this.startMargin - this.endMargin;
  }

  public get animatedBaseLengthTo() {
    return this.fullLength - this.valueLength - this.startMargin - this.endMargin;
  }
}
