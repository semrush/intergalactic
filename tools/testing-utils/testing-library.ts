export * from '@testing-library/user-event';
// eslint-disable-next-line import/export
export * from '@testing-library/react';
// @ts-ignore
import { fireEvent as fireEvent_ } from '@testing-library/react';
// eslint-disable-next-line import/export
export const fireEvent = fireEvent_;
