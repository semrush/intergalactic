import React from 'react';

type Disposer = () => void;
const sharedStateSubscribers: { [key: string]: ((value: any) => Disposer)[] } = {};
export const useLocalStorage = <T>(key: string) => {
  const initValue = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? 'null');
    } catch (err) {
      /* literally noting left do to */
    }
  }, [key]);
  const [value, setValue] = React.useState(initValue);

  React.useEffect(() => {
    const subscriber = (value: T) => {
      setValue(value);
      return () => {
        sharedStateSubscribers[key] = sharedStateSubscribers[key].filter(
          (item) => item !== subscriber,
        );
      };
    };
    sharedStateSubscribers[key] = sharedStateSubscribers[key] ?? [];
    sharedStateSubscribers[key].push(subscriber);
    return () => {
      sharedStateSubscribers[key] = sharedStateSubscribers[key].filter(
        (item) => item !== subscriber,
      );
    };
  }, [key]);

  const set = React.useCallback(
    (value: T) => {
      setValue(value);
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        /* literally noting left do to */
      }
      sharedStateSubscribers[key]?.forEach((subscriber) => subscriber(value));
    },
    [key],
  );

  return [value, set] as [T, (value: T) => void];
};
