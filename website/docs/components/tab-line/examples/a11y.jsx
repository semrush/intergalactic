import React, { useState } from 'react';
import TabLine from '@semcore/ui/tab-line';

export default () => {
  const [value, onChange] = useState(1);
  return (
    <>
      <TabLine value={value} onChange={onChange}>
        <TabLine.Item value={1} aria-controls="tab-panel-1">
          Overview
        </TabLine.Item>
        <TabLine.Item value={2} aria-controls="tab-panel-2">
          Issues
        </TabLine.Item>
        <TabLine.Item value={3} aria-controls="tab-panel-3">
          Progress
        </TabLine.Item>
        <TabLine.Item value={4} disabled>
          Disabled
        </TabLine.Item>
      </TabLine>
      {
        [
          <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-label-1" tabIndex={-1}>
            <h3>Overview</h3>
            <p>
              The important achievement of Apollo was demonstrating that humanity is not forever
              chained to this planet and our visions go rather further than that and our
              opportunities are unlimited.
            </p>
          </div>,
          <div
            id="tab-panel-2"
            aria-hidden="true"
            role="tabpanel"
            aria-labelledby="tab-label-2"
            tabIndex={-1}
          >
            <h3>Issues</h3>
            <p>
              Never limit yourself because of others' limited imagination; never limit others
              because of your own limited imagination.
            </p>
          </div>,
          <div
            id="tab-panel-3"
            aria-hidden="true"
            role="tabpanel"
            aria-labelledby="tab-label-3"
            tabIndex={-1}
          >
            <h3>Progress</h3>
            <p>
              After Apollo 17, America stopped looking towards the next horizon. The United States
              had become a space-faring nation, but threw it away. We have sacrificed space
              exploration for space exploitation, which is interesting but scarcely visionary.
            </p>
          </div>,
        ][value - 1]
      }
    </>
  );
};
