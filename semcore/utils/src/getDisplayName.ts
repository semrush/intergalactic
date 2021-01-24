/* eslint-disable */
import { ComponentType } from 'react';

export default function getDisplayName(WrappedComponent: ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
