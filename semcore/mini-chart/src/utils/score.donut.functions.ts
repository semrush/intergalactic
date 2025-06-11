const getViewBox = (isSemiDonut: boolean) => () => isSemiDonut ? '0 0 24 12' : '0 0 24 24';

const getStrokeWidth = (isSemiDonut: boolean) => () => isSemiDonut ? 6 : 4;

const getRadius = (isSemiDonut: boolean) => () => isSemiDonut ? 9 : 10;

const getBaseStrokeDashArray = (isSemiDonut: boolean) => (radius: number) => isSemiDonut ? Math.PI * radius : 2 * Math.PI * radius;

const getValueStrokeDashArray = (value: number, baseStrokeDashArray: number) => baseStrokeDashArray * (value / 100);

const getGreyStrokeDashArray = (baseStrokeDashArray: number, valueStrokeDashArray: number) => baseStrokeDashArray - valueStrokeDashArray;

const getOffsetPoint = (isSemiDonut: boolean) => (baseStrokeDashArray: number) => isSemiDonut ? baseStrokeDashArray / (100 / 3) : baseStrokeDashArray / 100;

const getStrokeDashArrayParts = (
  isSemiDonut: boolean,
) => (
  value: number,
  baseStrokeDashArray: number,
) => {
  const valueStroke = getValueStrokeDashArray(value, baseStrokeDashArray);
  const greyStroke = getGreyStrokeDashArray(baseStrokeDashArray, valueStroke);
  const offsetPoint = getOffsetPoint(isSemiDonut)(baseStrokeDashArray);

  const greyStrokeDash = greyStroke - 2 * offsetPoint;
  const strokeDashArrayBetweenSpaces = `${greyStrokeDash} ${offsetPoint}`;

  if (isSemiDonut) {
    return `${offsetPoint} ${value < 95 ? strokeDashArrayBetweenSpaces : ''} ${baseStrokeDashArray}`;
  }

  return `${offsetPoint} ${greyStrokeDash >= 0 ? strokeDashArrayBetweenSpaces : ''} ${baseStrokeDashArray}`;
};

const getStrokeDashOffsetBase = (
  isSemiDonut: boolean,
) => (
  value: number,
  baseStrokeDashArray: number,
) => {
  const valueStroke = getValueStrokeDashArray(value, baseStrokeDashArray);
  const offsetPoint = getOffsetPoint(isSemiDonut)(baseStrokeDashArray);

  return -1 * (valueStroke + (isSemiDonut ? offsetPoint : 0));
};

export default (isSemiDonut: boolean) => ({
  getViewBox: getViewBox(isSemiDonut),
  getStrokeWidth: getStrokeWidth(isSemiDonut),
  getRadius: getRadius(isSemiDonut),
  getBaseStrokeDashArray: getBaseStrokeDashArray(isSemiDonut),
  getStrokeDashArrayParts: getStrokeDashArrayParts(isSemiDonut),
  getStrokeDashOffsetBase: getStrokeDashOffsetBase(isSemiDonut),
  getOffsetPoint: getOffsetPoint(isSemiDonut),
  getValueStrokeDashArray,
  getGreyStrokeDashArray,
});
