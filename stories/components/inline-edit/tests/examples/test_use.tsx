import React from 'react';
import InlineEdit from '@semcore/inline-edit';
import { Flex } from '@semcore/flex-box';

const Example = () => {
  return (
    <Flex direction='row' gap={2}>
      <InlineEdit editable={false}>
        <InlineEdit.View>editable = false</InlineEdit.View>
        <InlineEdit.Edit>edit</InlineEdit.Edit>
      </InlineEdit>

      <InlineEdit>
        <InlineEdit.View>editable</InlineEdit.View>
        <InlineEdit.Edit>edit</InlineEdit.Edit>
      </InlineEdit>

      <InlineEdit>
        <InlineEdit.View>
          <br />
          <br />
          <br />
          <br />
          view
          <br />
          <br />
          <br />
          <br />
        </InlineEdit.View>
        <InlineEdit.Edit style={{ border: '1px solid red' }}>
          <br />
          <br />
          <br />
          edit
        </InlineEdit.Edit>
      </InlineEdit>

      <InlineEdit editable={true}>
        <InlineEdit.View>
          <br />
          <br />
          <br />
          <br />
          editable =true view
          <br />
          <br />
          <br />
          <br />
        </InlineEdit.View>
        <InlineEdit.Edit style={{ border: '1px solid red' }}>
          <br />
          <br />
          <br />
          editable =true edit
        </InlineEdit.Edit>
      </InlineEdit>
    </Flex>
  );
};

const Demo = Example;

export default Demo;
