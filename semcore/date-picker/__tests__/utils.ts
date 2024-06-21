export const RealDate = global.Date;

// https://github.com/facebook/jest/issues/2234#issuecomment-384884729
export function mockDate(isoDate: any) {
  (global as any).Date = class extends RealDate {
    constructor(...theArgs: any[]) {
      super();
      if (theArgs.length) {
        return new (RealDate as any)(...theArgs);
      }
      return new RealDate(isoDate);
    }

    static now() {
      return new RealDate(isoDate).getTime();
    }
  };
}
