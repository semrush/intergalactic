/* eslint-disable */
import { Component, PureComponent } from 'react';

export function isControlled<
  P extends {},
  S extends {},
  C extends Component<P, S> | PureComponent<P, S>
>(self: C, prop: keyof P) {
  return self.props[prop] !== undefined;
}

export function getState<C extends Component | PureComponent>(
  self: C,
  state: C['state'] = self.state,
) {
  return Object.entries(state).reduce((combinedState, [key, value]) => {
    if (isControlled(self, key)) {
      combinedState[key] = self.props[key];
    } else {
      combinedState[key] = value;
    }
    return combinedState;
  }, {} as Partial<C['state']>);
}

export function internalSetState<T, C extends Component<any, T> | PureComponent<any, T>>(
  self: C,
  changes: Partial<T> | ((combinedState: Partial<T>) => Partial<T>),
  callback: () => void = () => {},
) {
  self.setState(
    (state) => {
      const combinedState = getState(self, state);
      const changesObject = typeof changes === 'function' ? changes(combinedState) : changes;

      const nonControlledChanges = Object.entries(changesObject).reduce(
        (newChanges, [key, value]) => {
          if (!isControlled(self, key)) {
            newChanges[key] = value;
          }
          return newChanges;
        },
        {},
      );

      return Object.keys(nonControlledChanges).length ? nonControlledChanges : {};
    },
    () => {
      callback();
    },
  );
}
