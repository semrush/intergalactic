import React from 'react';
import { render, fireEvent, cleanup } from 'jest-preset-ui/testing';
import ProjectCreate from '../src';

describe('ProjectCreate', () => {
  afterEach(cleanup);

  test('Should support sharingCheckboxProps property', () => {
    const { getByTestId } = render(
      <ProjectCreate
        visible
        hasSharingCheckbox
        sharingCheckboxProps={{ 'data-testid': 'checkbox' }}
      />,
    );
    expect(getByTestId('checkbox')).toBeTruthy();
  });

  test('Should support correct render with defaultChecked checkbox', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <ProjectCreate
        visible
        hasSharingCheckbox
        sharingCheckboxProps={{ onChange: spy, defaultChecked: true, 'data-testid': 'checkbox' }}
      />,
    );
    fireEvent.click(getByTestId('checkbox'));
    expect(spy).toBeCalledWith(false, expect.anything());
  });
});
