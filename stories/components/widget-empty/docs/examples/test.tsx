import React from 'react';
import WidgetEmpty, { NoData, getIconPath } from '@semcore/widget-empty';
import FileExportM from '@semcore/icon/FileExport/m';
import { Hint } from '@semcore/tooltip';
import Button, { ButtonLink } from '@semcore/button';
const Demo = () => {
  
    return (
      <div>
        <NoData />
        <NoData> test test</NoData> 
        <NoData type = 'line-chart'/>
      <NoData description={'hdjebfjcbdsjv'} />

      <WidgetEmpty>
        <WidgetEmpty.Title>Title Title Title Title Title Title Title Title Title TitleTitleTitleTitleTitleTitle TitleTitleTitleTitle TitleTitleTitleTitle</WidgetEmpty.Title>
        <WidgetEmpty.Description>Description</WidgetEmpty.Description>
        <WidgetEmpty.Description>Description 2</WidgetEmpty.Description>
      </WidgetEmpty>

      <WidgetEmpty icon={getIconPath('good')} />;

      <WidgetEmpty icon={getIconPath('good')}>
      
            <WidgetEmpty.Title>Good results <Hint title='Export to PDF' tag={Button} addonLeft={FileExportM} /></WidgetEmpty.Title>
            <WidgetEmpty.Description>Wow! You are doing great!</WidgetEmpty.Description>
          </WidgetEmpty>
      </div>
    );
  };

  export default Demo;
