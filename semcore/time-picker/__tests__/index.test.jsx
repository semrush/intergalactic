import React from 'react';
import { snapshot } from '@semcore/testing-utils/snapshot';
import { expect, test, describe, beforeEach } from '@semcore/testing-utils/vitest';

import { render, cleanup } from '@semcore/testing-utils/testing-library';
import { axe } from '@semcore/testing-utils/axe';

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
  beforeEach(cleanup);

  test.concurrent('should support sizes', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <TimePickerDefault value="11" size="l">
          <TimePicker.Format />
        </TimePickerDefault>
        <TimePickerDefault value="11" size="m">
          <TimePicker.Format />
        </TimePickerDefault>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support disabled', async ({ task }) => {
    const component = (
      <snapshot.ProxyProps style={{ margin: 5 }}>
        <TimePickerDefault disabled />
        <TimePickerDefault disabled>
          <TimePicker.Format />
        </TimePickerDefault>
      </snapshot.ProxyProps>
    );

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support state', async ({ task }) => {
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

    await expect(await snapshot(component)).toMatchImageSnapshot(task);
  });

  test.concurrent('should support focus', async ({ task }) => {
    await expect(
      await snapshot(<TimePickerDefault focused />, {
        actions: {
          focus: '#hours',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <TimePickerDefault focused>
          <TimePicker.Format />
        </TimePickerDefault>,
        {
          actions: {
            focus: '#hours',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(<TimePickerDefault focused state="valid" />, {
        actions: {
          focus: '#hours',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <TimePickerDefault focused state="valid">
          <TimePicker.Format />
        </TimePickerDefault>,
        {
          actions: {
            focus: '#hours',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(<TimePickerDefault focused state="invalid" />, {
        actions: {
          focus: '#hours',
        },
      }),
    ).toMatchImageSnapshot(task);
    await expect(
      await snapshot(
        <TimePickerDefault focused state="invalid">
          <TimePicker.Format />
        </TimePickerDefault>,
        {
          actions: {
            focus: '#hours',
          },
        },
      ),
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('should support hover format', async ({ task }) => {
    await expect(
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
    ).toMatchImageSnapshot(task);
  });

  test.concurrent('should support active format', async ({ task }) => {
    await expect(
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
    ).toMatchImageSnapshot(task);
  });

  test('a11y', async ({ task }) => {
    const { container } = render(<TimePickerDefault />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
