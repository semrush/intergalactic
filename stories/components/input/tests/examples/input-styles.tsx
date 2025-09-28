import Search from '@semcore/icon/Search/m';
import Badge from '@semcore/ui/badge';
import Button from '@semcore/ui/button';
import { Flex, Box } from '@semcore/ui/flex-box';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React, { useState } from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={2}>
      <Flex direction='column' gap={2} mb={3} data-testid='Default'>
        <Text size={100}>Default input</Text>
        <Input size='m' w={150}>
          <Input.Value
            autoFocus
            placeholder='m-size'
            aria-labelledby='m-size'
            id='m-example'
          />
        </Input>
        <Input size='m' w={150} disabled>
          <Input.Value
            autoFocus
            placeholder='m-disabled'
            aria-labelledby='m-disabled'
            id='m-diabled'
          />
        </Input>

        <Input size='l' w={150}>
          <Input.Value
            placeholder='l-size'
            aria-labelledby='l-size'
            id='l-example'
          />
        </Input>
        <Input size='l' w={150}>
          <Input.Value
            readOnly
            placeholder='l-readOnly'
            aria-labelledby='l-readOnly'
            id='l-readOnly'
          />
        </Input>
        <Input size='m' w={150} state='invalid'>
          <Input.Value
            placeholder='m-invalid'
            aria-labelledby='m-invalid'
            id='m-invalid-example'
          />
        </Input>
        <Input size='m' w={150} state='invalid' disabled>
          <Input.Value
            placeholder='m-invalid-disabled'
            aria-labelledby='m-invalid-disabled'
            id='m-invalid-diabled'
          />
        </Input>
        <Input size='l' w={150} state='invalid'>
          <Input.Value
            placeholder='l-invalid'
            aria-labelledby='l-invalid'
            id='l-invalid-example'
          />
        </Input>
        <Input size='l' w={150}>
          <Input.Value
            readOnly
            placeholder='l-invalid-readOnly'
            aria-labelledby='l-invalid-readOnly'
            id='l-invalid-readOnly'
          />
        </Input>

        <Input size='m' w={150} state='valid'>
          <Input.Value
            placeholder='m-valid'
            aria-labelledby='m-valid'
            id='m-valid-example'
          />
        </Input>
        <Input size='m' w={150} state='valid' disabled>
          <Input.Value
            placeholder='m-valid-disabled'
            aria-labelledby='m-valid-disabled'
            id='m-valid-disabled'
          />
        </Input>
        <Input size='l' w={150} state='valid'>
          <Input.Value
            placeholder='l-valid'
            aria-labelledby='l-valid'
            id='l-valid-example'
          />
        </Input>
        <Input size='l' w={150} state='valid'>
          <Input.Value
            readOnly
            placeholder='l-valid-readOnly'
            aria-labelledby='l-valid-readOnly'
            id='l-valid-readOnly'
          />
        </Input>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Left-addon'>
        <Text size={100}>Left addon</Text>
        <Input size='m' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value

            placeholder='m-size'
            aria-labelledby='m-size'
            id='m-example'
          />
        </Input>
        <Input size='m' w={150} disabled>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            autoFocus
            placeholder='m-disabled'
            aria-labelledby='m-disabled'
            id='m-diabled'
          />
        </Input>

        <Input size='l' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='l-size'
            aria-labelledby='l-size'
            id='l-example'
          />
        </Input>
        <Input size='l' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            readOnly
            placeholder='l-readOnly'
            aria-labelledby='l-readOnly'
            id='l-readOnly'
          />
        </Input>
        <Input size='m' w={150} state='invalid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-invalid'
            aria-labelledby='m-invalid'
            id='m-invalid-example'
          />
        </Input>
        <Input size='m' w={150} state='invalid' disabled>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-invalid-disabled'
            aria-labelledby='m-invalid-disabled'
            id='m-invalid-diabled'
          />
        </Input>
        <Input size='l' w={150} state='invalid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='l-invalid'
            aria-labelledby='l-invalid'
            id='l-invalid-example'
          />
        </Input>
        <Input size='l' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            readOnly
            placeholder='l-invalid-readOnly'
            aria-labelledby='l-invalid-readOnly'
            id='l-invalid-readOnly'
          />
        </Input>

        <Input size='m' w={150} state='valid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-valid'
            aria-labelledby='m-valid'
            id='m-valid-example'
          />
        </Input>
        <Input size='m' w={150} state='valid' disabled>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-valid-disabled'
            aria-labelledby='m-valid-disabled'
            id='m-valid-disabled'
          />
        </Input>
        <Input size='l' w={150} state='valid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='l-valid'
            aria-labelledby='l-valid'
            id='l-valid-example'
          />
        </Input>
        <Input size='l' w={150} state='valid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            readOnly
            placeholder='l-valid-readOnly'
            aria-labelledby='l-valid-readOnly'
            id='l-valid-readOnly'
          />
        </Input>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Left-right-addon'>
        <Text size={100}>Left Right addon</Text>
        <Input size='m' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value

            placeholder='m-size'
            aria-labelledby='m-size'
            id='m-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>
        <Input size='m' w={150} disabled>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            autoFocus
            placeholder='m-disabled'
            aria-labelledby='m-disabled'
            id='m-diabled'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='l-size'
            aria-labelledby='l-size'
            id='l-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            readOnly
            placeholder='l-readOnly'
            aria-labelledby='l-readOnly'
            id='l-readOnly'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='m' w={150} state='invalid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-invalid'
            aria-labelledby='m-invalid'
            id='m-invalid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='m' w={150} state='invalid' disabled>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-invalid-disabled'
            aria-labelledby='m-invalid-disabled'
            id='m-invalid-diabled'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150} state='invalid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='l-invalid'
            aria-labelledby='l-invalid'
            id='l-invalid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150}>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            readOnly
            placeholder='l-invalid-readOnly'
            aria-labelledby='l-invalid-readOnly'
            id='l-invalid-readOnly'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='m' w={150} state='valid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-valid'
            aria-labelledby='m-valid'
            id='m-valid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>
        <Input size='m' w={150} state='valid' disabled>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='m-valid-disabled'
            aria-labelledby='m-valid-disabled'
            id='m-valid-disabled'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150} state='valid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            placeholder='l-valid'
            aria-labelledby='l-valid'
            id='l-valid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150} state='valid'>
          <Input.Addon>
            <Search />
          </Input.Addon>
          <Input.Value
            readOnly
            placeholder='l-valid-readOnly'
            aria-labelledby='l-valid-readOnly'
            id='l-valid-readOnly'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Right-addon'>
        <Text size={100}>Left Right addon</Text>
        <Input size='m' w={150}>

          <Input.Value

            placeholder='m-size'
            aria-labelledby='m-size'
            id='m-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>
        <Input size='m' w={150} disabled>

          <Input.Value
            autoFocus
            placeholder='m-disabled'
            aria-labelledby='m-disabled'
            id='m-diabled'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150}>

          <Input.Value
            placeholder='l-size'
            aria-labelledby='l-size'
            id='l-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150}>

          <Input.Value
            readOnly
            placeholder='l-readOnly'
            aria-labelledby='l-readOnly'
            id='l-readOnly'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='m' w={150} state='invalid'>

          <Input.Value
            placeholder='m-invalid'
            aria-labelledby='m-invalid'
            id='m-invalid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='m' w={150} state='invalid' disabled>

          <Input.Value
            placeholder='m-invalid-disabled'
            aria-labelledby='m-invalid-disabled'
            id='m-invalid-diabled'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150} state='invalid'>

          <Input.Value
            placeholder='l-invalid'
            aria-labelledby='l-invalid'
            id='l-invalid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150}>

          <Input.Value
            readOnly
            placeholder='l-invalid-readOnly'
            aria-labelledby='l-invalid-readOnly'
            id='l-invalid-readOnly'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='m' w={150} state='valid'>

          <Input.Value
            placeholder='m-valid'
            aria-labelledby='m-valid'
            id='m-valid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>
        <Input size='m' w={150} state='valid' disabled>

          <Input.Value
            placeholder='m-valid-disabled'
            aria-labelledby='m-valid-disabled'
            id='m-valid-disabled'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150} state='valid'>

          <Input.Value
            placeholder='l-valid'
            aria-labelledby='l-valid'
            id='l-valid-example'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>

        <Input size='l' w={150} state='valid'>
          <Input.Value
            readOnly
            placeholder='l-valid-readOnly'
            aria-labelledby='l-valid-readOnly'
            id='l-valid-readOnly'
          />
          <Input.Addon>
            <Badge bg='red-400'>alpha</Badge>
          </Input.Addon>
        </Input>
      </Flex>
    </Flex>
  );
};

export default Demo;
