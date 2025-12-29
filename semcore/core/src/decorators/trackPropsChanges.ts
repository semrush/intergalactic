type WatchedProps<Props> = { [key in keyof Props]?: any };

type Constructor<Props> = new (...args: any) => {
  props: Props;
  onPropsChange(changedProps: WatchedProps<Props>): void;
  render(): any;
};

function trackPropsChanges<
  P,
  C extends Constructor<P> = Constructor<P>,
>(propsToWatch: Array<keyof P>) {
  const watchedProps: WatchedProps<P> = {};

  return function (Class: C) {
    return class extends Class {
      constructor(...args: any[]) {
        super(...args);

        propsToWatch.reduce((acc, prop) => {
          acc[prop] = this.props?.[prop];

          return acc;
        }, watchedProps);
      }

      onPropsChange(_?: WatchedProps<P>) {
        let shouldCallFunc = false;
        const changedProps: WatchedProps<P> = {};

        propsToWatch.forEach((prop) => {
          const isPropValueEqual = Object.is(watchedProps[prop], this.props[prop]);

          if (!isPropValueEqual) {
            watchedProps[prop] = this.props[prop];
            changedProps[prop] = this.props[prop];

            shouldCallFunc = true;
          }
        });

        if (!shouldCallFunc) return;

        super.onPropsChange(changedProps);
      }

      render() {
        this.onPropsChange();

        return super.render();
      }
    };
  };
}

export default trackPropsChanges;
