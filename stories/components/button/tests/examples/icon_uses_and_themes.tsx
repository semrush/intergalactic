import React from 'react';
import Button from '@semcore/button';
import { Flex, Box } from '@semcore/flex-box';

const Demo = () => {
  return (
    <>
      <Flex columnGap={2} mb={3}>
        <Button>Secondary muted</Button>
        <Button size={'l'}>Secondary muted</Button>
      </Flex>

      <Box style={{ backgroundColor: '#191B23' }} p={4} mb={3}>
        <Flex columnGap={2} mb={3}>
          <Button theme='invert'>Secondary invert</Button>
          <Button theme='invert' size={'l'}>
            Secondary invert
          </Button>
        </Flex>
      </Box>

      <Flex columnGap={2} mb={4}>
        <Button use='primary'>Primary info</Button>
        <Button use='primary' size={'l'}>
          Primary info
        </Button>
      </Flex>

      <Flex columnGap={2} mb={4}>
        <Button use='primary' theme='success'>
          Primary success
        </Button>
        <Button use='primary' theme='success' size={'l'}>
          Primary success
        </Button>
      </Flex>

      <Flex columnGap={2} mb={4}>
        <Button use='primary' theme='brand'>
          Primary brand
        </Button>
        <Button use='primary' theme='brand' size={'l'}>
          Primary brand
        </Button>
      </Flex>

      <Flex columnGap={2} mb={4}>
        <Button use='primary' theme='danger'>
          Primary danger
        </Button>
        <Button use='primary' theme='danger' size={'l'}>
          Primary danger
        </Button>
      </Flex>

      <Box style={{ backgroundColor: '#191B23' }} p={4} mb={3}>
      <Flex columnGap={2} mb={3}>
        <Button use='primary' theme='invert'>
          Primary invert
        </Button>
        <Button use='primary' theme='invert' size={'l'}>
          Primary invert
        </Button>
        </Flex>
      </Box>

      <Flex columnGap={2} mb={4}>
        <Button use='tertiary' theme='muted'>
          Tertiary muted
        </Button>
        <Button use='tertiary' theme='muted' size={'l'}>
          Tertiary muted
        </Button>
      </Flex>

      <Flex columnGap={2} mb={4}>
        <Button use='tertiary' theme='info'>
          Tertiary info
        </Button>
        <Button use='tertiary' theme='info' size={'l'}>
          Tertiary info
        </Button>
      </Flex>

      <Box style={{ backgroundColor: '#191B23' }} p={4} mb={3}>
      <Flex columnGap={2} mb={3}>
        <Button use='tertiary' theme='invert'>
          Tertiary invert
        </Button>
        <Button use='tertiary' theme='invert' size={'l'}>
          Tertiary invert
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Demo;
