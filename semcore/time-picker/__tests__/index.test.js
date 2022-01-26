import React from 'react';
import { render, cleanup, axe } from '@semcore/jest-preset-ui/testing';
import { shouldSupportClassName, shouldSupportRef } from '@semcore/jest-preset-ui/shared';
import snapshot from '@semcore/jest-preset-ui/snapshot';
import TimePicker from '../src';

const TimePickerDefault = ({ children, ...other }) => (
  <TimePicker {...other}>
    <TimePicker.Hours />
    <TimePicker.Separator />
    <TimePicker.Minutes />
    {children}
  </TimePicker>
);

describe('TimePicker', () => {
  afterEach(cleanup);

  shouldSupportClassName(TimePicker);
  shouldSupportRef(TimePicker);

  test('should support custom attributes on the TimePicker', () => {
    const { getByTestId } = render(<TimePicker data-testid="textarea" name="test" />);

    expect(getByTestId('textarea').attributes['name'].value).toBe('test');
  });

  test('should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <TimePickerDefault size="xl" />
        <TimePickerDefault size="l" />
        <TimePickerDefault size="m" />
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support disabled', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <TimePickerDefault disabled />
        <TimePickerDefault disabled>
          <TimePicker.Format />
        </TimePickerDefault>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('should support state', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <TimePickerDefault state="invalid" />
        <TimePickerDefault state="invalid">
          <TimePicker.Format />
        </TimePickerDefault>
        <TimePickerDefault state="valid" />
        <TimePickerDefault state="valid">
          <TimePicker.Format />
        </TimePickerDefault>
      </snapshot.ProxyProps>
    );

    expect(await snapshot(component)).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<TimePickerDefault />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('TimePicker.Hours', () => {
  afterEach(cleanup);
  shouldSupportClassName(TimePicker.Hours, TimePicker);
  shouldSupportRef(TimePicker.Hours, TimePicker);
});

describe('TimePicker.Minutes', () => {
  afterEach(cleanup);
  shouldSupportClassName(TimePicker.Minutes, TimePicker);
  shouldSupportRef(TimePicker.Minutes, TimePicker);
});
