import { Box } from '@semcore/flex-box';
import Check from '@semcore/icon/Check/m';
import Edit from '@semcore/icon/Edit/m';
import InputTags from '@semcore/input-tags';
import React from 'react';

const Demo = () => {
  return (
    <Box>
      <InputTags size='m' state='normal'>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag With text and addon</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text and close</InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text</InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag with addon text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Circle
              style={{
                background: '#2595e4',
              }}
            />
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Addon circle text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Close />
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Value readOnly={false} />
      </InputTags>

      <InputTags size='l' state='normal'>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag With text and addon</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text and close</InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text</InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag with addon text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Circle
              style={{
                background: '#2595e4',
              }}
            />
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Addon circle text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Close />
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Value readOnly={false} />
      </InputTags>

      <InputTags size='m' state='invalid'>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag With text and addon</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text and close</InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text</InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag with addon text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Circle
              style={{
                background: '#2595e4',
              }}
            />
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Addon circle text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Close />
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Value readOnly={false} />
      </InputTags>

      <InputTags size='l' state='valid'>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag With text and addon</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text and close</InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>
        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>Tag with text</InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Tag with addon text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Circle
              style={{
                background: '#2595e4',
              }}
            />
            <InputTags.Tag.Addon>
              <Check />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Text.Content>Addon circle text and close</InputTags.Tag.Text.Content>
          </InputTags.Tag.Text>
          <InputTags.Tag.Close />
        </InputTags.Tag>

        <InputTags.Tag editable={false}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
            <InputTags.Tag.Close />
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Tag editable={true}>
          <InputTags.Tag.Text>
            <InputTags.Tag.Addon>
              <Edit />
            </InputTags.Tag.Addon>
          </InputTags.Tag.Text>
        </InputTags.Tag>
        <InputTags.Value readOnly={false} />
      </InputTags>
    </Box>
  );
};

export default Demo;
