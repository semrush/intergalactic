import React from 'react';
import { testing, snapshot } from '@semcore/jest-preset-ui';

const { render, cleanup, axe } = testing;
import TimePicker from '../src';

const TimePickerDefault = ({ children, ...other }) => (
  <TimePicker {...other}>
    <TimePicker.Hours id="hours" />
    <TimePicker.Separator />
    <TimePicker.Minutes id="minutes" />
    {children}
  </TimePicker>
);

describe('TimePicker', () => {
  afterEach(cleanup);

  test('should support sizes', async () => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <TimePickerDefault value="11" size="l" />
        <TimePickerDefault value="11" size="m" />
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

  test('should support focus', async () => {
    expect(
      await snapshot(<TimePickerDefault />, {
        actions: {
          focus: '#hours',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <TimePickerDefault>
          <TimePicker.Format />
        </TimePickerDefault>,
        {
          actions: {
            focus: '#hours',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(<TimePickerDefault state="valid" />, {
        actions: {
          focus: '#hours',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <TimePickerDefault state="valid">
          <TimePicker.Format />
        </TimePickerDefault>,
        {
          actions: {
            focus: '#hours',
          },
        },
      ),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(<TimePickerDefault state="invalid" />, {
        actions: {
          focus: '#hours',
        },
      }),
    ).toMatchImageSnapshot();
    expect(
      await snapshot(
        <TimePickerDefault state="invalid">
          <TimePicker.Format />
        </TimePickerDefault>,
        {
          actions: {
            focus: '#hours',
          },
        },
      ),
    ).toMatchImageSnapshot();
  });

  test('should support hover format', async () => {
    expect(
      await snapshot(
        <TimePickerDefault>
          <TimePicker.Format id="format" />
        </TimePickerDefault>,
        {
          actions: {
            hover: '#format',
          },
        },
      ),
    ).toMatchImageSnapshot();
  });

  test('should support active format', async () => {
    expect(
      await snapshot(
        <TimePickerDefault>
          <TimePicker.Format id="format" />
        </TimePickerDefault>,
        {
          actions: {
            active: '#format',
          },
        },
      ),
    ).toMatchImageSnapshot();
  });

  test('a11y', async () => {
    const { container } = render(<TimePickerDefault />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
