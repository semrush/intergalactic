export const getEventTarget = (event: React.SyntheticEvent | Event): EventTarget | null => {
  if ('composedPath' in event) {
    const composedPath = event.composedPath();

    if (composedPath) {
      for (const element of composedPath) {
        if ('shadowRoot' in element && element.shadowRoot) {
          return element;
        }
      }
    }

    return composedPath?.[0] || event.target;
  }
  if (event.nativeEvent && 'composedPath' in event.nativeEvent) {
    const composedPath = event.nativeEvent.composedPath();

    if (composedPath) {
      for (const element of composedPath) {
        if ('shadowRoot' in element && element.shadowRoot) {
          return element;
        }
      }
    }
    return composedPath?.[0] || event.target;
  }
  return event.target;
};
