type Axis = 'horizontal' | 'vertical';
type SizePayload = { width: number; height: number };
type Position = 'top' | 'bottom' | 'left' | 'right';

type TicksMeta = {
  [key in Axis]: {
    size: SizePayload | null;
    isVisible: boolean | null;
    position: Position | null;
  }
};

export class ChartMetaData {
  private ticks: TicksMeta = {
    horizontal: {
      size: null,
      isVisible: null,
      position: null,
    },
    vertical: {
      size: null,
      isVisible: null,
      position: null,
    },
  };

  getTicksSize(axis: Axis) {
    return this.ticks[axis].size;
  }

  setTicksSize(axis: Axis, payload: SizePayload) {
    this.ticks[axis].size = payload;
  }

  getTicksVisibility(axis: Axis) {
    return this.ticks[axis].isVisible;
  }

  setTicksVisibility(axis: Axis, isVisible: boolean) {
    this.ticks[axis].isVisible = isVisible;
  }

  getTicksPosition(axis: Axis) {
    return this.ticks[axis].position;
  }

  setTicksPosition(axis: Axis, position: Position) {
    this.ticks[axis].position = position;
  }
}
