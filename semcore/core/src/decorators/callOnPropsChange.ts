type Function<Props> = (this: { props: Props }, ...args: any[]) => any;

function callOnPropsChange<Props extends Record<string, any>>(propsToWatch: Array<keyof Props>) {
  let watchedProps: { [key in keyof Props]?: any } = {};

  return function <F extends Function<Props>>(decoratedFunc: F, { addInitializer }: ClassMethodDecoratorContext) {
    addInitializer(function () {
      watchedProps = propsToWatch.reduce((acc, prop) => {
        acc[prop] = (this as { props: Props }).props?.[prop];

        return acc;
      }, {} as { [key in keyof Props]: any });
    });

    return function (this: { props: Props }, ...args: Parameters<F>) {
      let shouldCallFunc = false;

      propsToWatch.forEach((prop) => {
        const isPropValueDiffers = watchedProps[prop] !== this.props[prop];

        if (isPropValueDiffers) {
          watchedProps[prop] = this.props[prop];
          shouldCallFunc = true;
        }
      });

      if (!shouldCallFunc) return;

      return decoratedFunc.call(this, ...args);
    };
  };
}

export default callOnPropsChange;
