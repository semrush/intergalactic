type WatchedProps<Props> = { [key in keyof Props]?: unknown };

type Constructor<Props> = new (...args: any[]) => {
  props: Props;
  onPropsChange(changedProps: WatchedProps<Props>): void;
  render(): React.ReactNode;
  componentWillUnmount?(): void;
};

function propsObserver<
  P extends Record<string, any>,
  C extends Constructor<P>,
>(propsToWatch: Array<keyof P>) {
  return function (Class: C): C & Constructor<P> {
    return class extends Class {
      __observableProps: WatchedProps<P> = {};

      constructor(...args: any[]) {
        super(...args);

        if (!this.props) return;

        const observablePropKeys = propsToWatch.length === 0 ? Object.keys(this.props) : [...propsToWatch];

        observablePropKeys.forEach((key) => {
          this.__observableProps[key] = this.props[key];
        });
      }

      onPropsChange(_?: WatchedProps<P>) {
        let shouldEmitChanges = false;
        const changedProps: WatchedProps<P> = {};

        Object.entries(this.__observableProps).forEach(([key, value]: [key: keyof P, value: unknown]) => {
          const arePropsEqual = Object.is(value, this.props[key]);

          if (!arePropsEqual) {
            this.__observableProps[key] = this.props[key];
            changedProps[key] = this.props[key];

            shouldEmitChanges = true;
          }
        });

        if (!shouldEmitChanges) return;

        super.onPropsChange(changedProps);
      }

      componentWillUnmount() {
        super.componentWillUnmount?.();

        Object.keys(this.__observableProps).forEach((key: keyof P) => {
          this.__observableProps[key] = undefined;
        });
      }

      render() {
        this.onPropsChange();

        return super.render();
      }
    };
  };
}

export default propsObserver;
