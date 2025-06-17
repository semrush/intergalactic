import { Box, Flex } from '@semcore/flex-box';
import Check from '@semcore/icon/Check/m';
import Edit from '@semcore/icon/Edit/m';
import InputTags from '@semcore/input-tags';
import React from 'react';

const isValidEmail = (value: string) => /.+@.+\..+/i.test(value.toLowerCase());

const Demo = () => {
  return (
    <Flex direction='column' gap={2}>
      <Flex direction='column' gap={2} data-testid='normal-state' w={450}>
        <InputTags size='m' state='normal'>
          <InputTags.Tag editable={false} size='xl' interactive>
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Text and addon XL interactive</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
          </InputTags.Tag>

          <InputTags.Tag editable={true} disabled>
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Addon text and close disabled</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag editable={true} color='red'>
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Circle addon text and close color</InputTags.Tag.Text.Content>
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

        <InputTags size='m' state='normal'>
          <InputTags.Tag editable={false}>

            <InputTags.Tag.Text>

              <InputTags.Tag.Text.Content>Text and addon </InputTags.Tag.Text.Content>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
            </InputTags.Tag.Text>

          </InputTags.Tag>

          <InputTags.Tag editable={true} theme='secondary' color='salad-500'>
            <InputTags.Tag.Text>
              <InputTags.Tag.Text.Content>Text addong and close</InputTags.Tag.Text.Content>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
            </InputTags.Tag.Text>

            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag editable={true} size='l' active>
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Circle addon text and close L active</InputTags.Tag.Text.Content>
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

        <InputTags size='l'>
          {['bob_vk.com', 'wolf@instagram.dot'].map((tag, idx) => (
            <InputTags.Tag
              key={idx}
              style={{ textDecoration: !isValidEmail(tag) ? 'line-through' : 'none' }}
            >
              <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
              <InputTags.Tag.Close data-id={idx} />
            </InputTags.Tag>
          ))}
          <InputTags.Value value='' />
        </InputTags>

        <InputTags hMin={50}>
          {['bob_vk.com', 'wolf@instagram.dot'].map((tag, idx) => (
            <InputTags.Tag key={idx}>{tag}</InputTags.Tag>
          ))}
          <InputTags.Value placeholder='placeholder' />
        </InputTags>

      </Flex>

      <Flex direction='column' gap={2} data-testid='invalid-state' w={500}>
        <InputTags size='m' state='invalid'>
          <InputTags.Tag editable={false} size='xl' interactive>
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Text and addon XL interactive</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
          </InputTags.Tag>

          <InputTags.Tag editable={true} disabled>
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Addon text and close disabled</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag editable={true} color='red'>
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Circle addon text and close color</InputTags.Tag.Text.Content>
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

              <InputTags.Tag.Text.Content>Text and addon </InputTags.Tag.Text.Content>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
            </InputTags.Tag.Text>

          </InputTags.Tag>

          <InputTags.Tag editable={true} theme='secondary' color='salad-500'>
            <InputTags.Tag.Text>
              <InputTags.Tag.Text.Content>Text addong and close</InputTags.Tag.Text.Content>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
            </InputTags.Tag.Text>

            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag editable={true} size='l' active>
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Circle addon text and close L active</InputTags.Tag.Text.Content>
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

      </Flex>

      <Flex direction='column' gap={2} data-testid='invalid-state' w={250}>
        <InputTags size='m' state='valid'>
          <InputTags.Tag editable={false} size='xl' interactive>
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Text and addon XL interactive</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
          </InputTags.Tag>

          <InputTags.Tag editable={true} disabled>
            <InputTags.Tag.Text>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Addon text and close disabled</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag editable={true} color='red'>
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Circle addon text and close color</InputTags.Tag.Text.Content>
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

        <InputTags size='m' state='valid'>
          <InputTags.Tag editable={false}>

            <InputTags.Tag.Text>

              <InputTags.Tag.Text.Content>Text and addon </InputTags.Tag.Text.Content>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
            </InputTags.Tag.Text>

          </InputTags.Tag>

          <InputTags.Tag editable={true} theme='secondary' color='salad-500'>
            <InputTags.Tag.Text>
              <InputTags.Tag.Text.Content>Text addong and close</InputTags.Tag.Text.Content>
              <InputTags.Tag.Addon>
                <Edit />
              </InputTags.Tag.Addon>
            </InputTags.Tag.Text>

            <InputTags.Tag.Close />
          </InputTags.Tag>

          <InputTags.Tag editable={true} size='l' active>
            <InputTags.Tag.Text>
              <InputTags.Tag.Circle
                style={{
                  background: '#2595e4',
                }}
              />
              <InputTags.Tag.Addon>
                <Check />
              </InputTags.Tag.Addon>
              <InputTags.Tag.Text.Content>Circle addon text and close L active</InputTags.Tag.Text.Content>
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

      </Flex>
    </Flex>
  );
};

const tags = ['vk', 'fk', 'twitter', 'instagram'];

export default Demo;
