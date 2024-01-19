export const getEventTarget = (event: React.SyntheticEvent | Event): EventTarget | null => {
  if ('composedPath' in event) {
    return event.composedPath()?.[0] || event.target;
  }
  if (event.nativeEvent) {
    if ('composedPath' in event.nativeEvent) {
      return event.nativeEvent.composedPath()?.[0] || event.target;
    }
  }
  return event.target;
};
