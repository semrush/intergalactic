import Button from '@semcore/button';
import { Flex, Box } from '@semcore/flex-box';
import VideoListM from '@semcore/icon/VideoList/m';
import VideoListL from '@semcore/icon/VideoList/l';
import Tooltip, { Hint } from '@semcore/tooltip';
import Badge from '@semcore/badge';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Flex direction='row' gap={1}>
      <Flex direction='column' gap={2} mb={3} data-testid='Secondary-muted'>
        <Text size={100}>Secondary muted</Text>
        <Button>Button M</Button>
        <Button size='l'>Button L</Button>
        <Button active>Active</Button>
        <Button size='l' loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button disabled active>Disabled Active</Button>

        <Button addonLeft={VideoListM}>Addon Left</Button>
        <Button size='l'>
          <Button.Text>Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button size='l' addonLeft={VideoListM} addonRight={VideoListL}>Addons</Button>
        <Button addonLeft={VideoListM} title='Button secondary Addon' hintPlacement='bottom' />
        <Hint tag={Button} addonLeft={VideoListM} title='Hint Button secondary Addon' />
        <Tooltip tag={Button} addonLeft={VideoListM} title='Tooltip Button secondary Addon' />
        <Button addonLeft={VideoListM}>
          <Button.Text>Button</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </Flex>

      <Box style={{ backgroundColor: '#191B23' }} p={1} mb={3}>
        <Flex direction='column' gap={2} mb={3} data-testid='Secondary-invert'>
          <Text size={100} color='white'>Secondary invert</Text>
          <Button theme='invert'>Button M</Button>
          <Button theme='invert' size='l'>
            Button L
          </Button>
          <Button theme='invert' active>Active</Button>
          <Button theme='invert' size='l' loading>
            Loading
          </Button>
          <Button disabled theme='invert'>Disabled</Button>
          <Button disabled active theme='invert'>Disabled Active</Button>

          <Button addonLeft={VideoListM} theme='invert'>Addon Left</Button>
          <Button size='l' theme='invert'>
            <Button.Text>Addon</Button.Text>
            <Button.Addon>
              <VideoListM />
            </Button.Addon>
          </Button>
          <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} theme='invert'>Addons</Button>
          <Button addonLeft={VideoListM} title='Button invert theme Addon' theme='invert' />
          <Hint tag={Button} addonLeft={VideoListM} title='Hint Button invert theme Addon' theme='invert' hintPlacement='right' />
          <Tooltip tag={Button} addonLeft={VideoListM} title='Tooltip Button invert theme Addon' theme='invert' />
          <Button theme='invert'>
            <Button.Text>Button</Button.Text>
            <Button.Addon>
              <Badge bg='--intergalactic-control-primary-success'>new</Badge>
            </Button.Addon>
          </Button>
        </Flex>
      </Box>

      <Flex direction='column' gap={2} mb={3} data-testid='Primary-info'>
        <Text size={100}>Primary info</Text>

        <Button use='primary'>Button M</Button>
        <Button use='primary' size='l'>
          Button L
        </Button>
        <Button active use='primary'>Active</Button>
        <Button use='primary' size='l' loading>
          Loading
        </Button>
        <Button disabled use='primary'>Disabled</Button>
        <Button disabled active use='primary'>Disabled Active</Button>

        <Button addonLeft={VideoListM} use='primary'>Addon Left</Button>
        <Button size='l' use='primary'>
          <Button.Text>Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='primary'>Addons</Button>
        <Button addonLeft={VideoListM} title='Button primary Addon' use='primary' />
        <Hint tag={Button} addonLeft={VideoListM} title='Hint Button primary Addon' use='primary' />
        <Tooltip tag={Button} addonLeft={VideoListM} title='Tooltip Button primary Addon' use='primary' />
        <Button use='primary'>
          <Button.Text>Button</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Primary-success'>
        <Text size={100}>Primary success</Text>
        <Button use='primary' theme='success'>
          Button M
        </Button>
        <Button use='primary' theme='success' size='l'>
          Button L
        </Button>
        <Button use='primary' theme='success' active>
          Active
        </Button>
        <Button use='primary' theme='success' size='l' loading>
          Loading
        </Button>
        <Button disabled use='primary' theme='success'>Disabled</Button>
        <Button disabled active use='primary' theme='success'>Disabled Active</Button>

        <Button addonLeft={VideoListM} use='primary' theme='success'>Addon Left</Button>
        <Button size='l' use='primary' theme='success'>
          <Button.Text>Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='primary' theme='success'>Addons</Button>
        <Button addonLeft={VideoListM} title='Button primary success Addon' use='primary' theme='success' />
        <Button use='primary' theme='success'>
          <Button.Text>Button</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Primary-brand'>
        <Text size={100}>Primary brand</Text>
        <Button use='primary' theme='brand'>
          Button M
        </Button>
        <Button use='primary' theme='brand' size='l'>
          Button L
        </Button>
        <Button use='primary' theme='brand' active>
          Active
        </Button>
        <Button use='primary' theme='brand' size='l' loading>
          Loading
        </Button>
        <Button disabled use='primary' theme='brand'>Disabled</Button>
        <Button disabled active use='primary' theme='brand'>Disabled Active</Button>

        <Button addonLeft={VideoListM} use='primary' theme='brand'>Addon Left</Button>
        <Button size='l' use='primary' theme='brand'>
          <Button.Text>Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='primary' theme='brand'>Addons</Button>
        <Button addonLeft={VideoListM} title='Button primary Brand Addon' use='primary' theme='brand' />
        <Button use='primary' theme='brand'>
          <Button.Text>Button</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Primary-danger'>
        <Text size={100}>Primary danger</Text>
        <Button use='primary' theme='danger'>
          Button M
        </Button>
        <Button use='primary' theme='danger' size='l'>
          Button L
        </Button>
        <Button use='primary' theme='danger' active>
          Active
        </Button>
        <Button use='primary' theme='danger' size='l' loading>
          Loading
        </Button>
        <Button disabled use='primary' theme='danger'>Disabled</Button>
        <Button disabled active use='primary' theme='danger'>Disabled Active</Button>

        <Button addonLeft={VideoListM} use='primary' theme='danger'>Addon Left</Button>
        <Button size='l' use='primary' theme='danger'>
          <Button.Text>Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='primary' theme='danger'>Addons</Button>
        <Button addonLeft={VideoListM} title='Button primary danger Addon' use='primary' theme='danger' />
        <Button use='primary' theme='danger'>
          <Button.Text>Button</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </Flex>

      <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1}>
        <Flex direction='column' gap={2} mb={3} data-testid='Primary-invert'>
          <Text size={100} color='white'>Primary invert</Text>

          <Button use='primary' theme='invert'>
            Button M
          </Button>
          <Button use='primary' theme='invert' size='l'>
            Button L
          </Button>
          <Button use='primary' theme='invert' active>
            Active
          </Button>
          <Button use='primary' theme='invert' size='l' loading>
            Loading
          </Button>
          <Button disabled use='primary' theme='invert'>Disabled</Button>
          <Button disabled active use='primary' theme='invert'>Disabled Active</Button>

          <Button addonLeft={VideoListM} use='primary' theme='invert'>Addon Left</Button>
          <Button size='l' use='primary' theme='invert'>
            <Button.Text>Addon</Button.Text>
            <Button.Addon>
              <VideoListM />
            </Button.Addon>
          </Button>
          <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='primary' theme='invert'>Addons</Button>
          <Button addonLeft={VideoListM} title='Button primary invert Addon' use='primary' theme='invert' />
          <Button use='primary' theme='invert'>
            <Button.Text>Button</Button.Text>
            <Button.Addon>
              <Badge bg='--intergalactic-control-primary-success'>new</Badge>
            </Button.Addon>
          </Button>
        </Flex>
      </Box>

      <Flex direction='column' gap={2} mb={3} data-testid='Tertiary-muted'>
        <Text size={100}>Tertiary muted</Text>

        <Button use='tertiary' theme='muted'>
          Button M
        </Button>
        <Button use='tertiary' theme='muted' size='l'>
          Button L
        </Button>
        <Button use='tertiary' theme='muted' active>
          Active
        </Button>
        <Button use='tertiary' theme='muted' size='l' loading>
          Loading
        </Button>
        <Button disabled use='tertiary' theme='muted'>Disabled</Button>
        <Button disabled active use='tertiary' theme='muted'>Disabled Active</Button>

        <Button addonLeft={VideoListM} use='tertiary' theme='muted'>Addon Left</Button>
        <Button size='l' use='tertiary' theme='muted'>
          <Button.Text>Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='tertiary' theme='muted'>Addons</Button>
        <Button addonLeft={VideoListM} title='Button tertiary muted Addon' use='tertiary' theme='muted' />
        <Button use='tertiary' theme='muted'>
          <Button.Text>Button</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Tertiary-info'>
        <Text size={100}>Tertiary info</Text>

        <Button use='tertiary' theme='info'>
          Button M
        </Button>
        <Button use='tertiary' theme='info' size='l'>
          Button L
        </Button>
        <Button use='tertiary' theme='info' active>
          Active
        </Button>
        <Button use='tertiary' theme='info' size='l' loading>
          Loading
        </Button>
        <Button disabled use='tertiary' theme='info'>Disabled</Button>
        <Button disabled active use='tertiary' theme='info'>Disabled Active</Button>

        <Button addonLeft={VideoListM} use='tertiary' theme='info'>Addon Left</Button>
        <Button size='l' use='tertiary' theme='info'>
          <Button.Text>Addon</Button.Text>
          <Button.Addon>
            <VideoListM />
          </Button.Addon>
        </Button>
        <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='tertiary' theme='info'>Addons</Button>
        <Button addonLeft={VideoListM} title='Button tertiary info Addon' use='tertiary' theme='info' />
        <Button use='tertiary' theme='info'>
          <Button.Text>Button</Button.Text>
          <Button.Addon>
            <Badge bg='--intergalactic-control-primary-success'>new</Badge>
          </Button.Addon>
        </Button>
      </Flex>

      <Box style={{ backgroundColor: '#191B23' }} mb={3} p={1} data-testid='Tertiary-invert'>
        <Flex direction='column' gap={2} mb={3}>
          <Text size={100} color='white'>Tertiary invert</Text>

          <Button use='tertiary' theme='invert'>
            Button M
          </Button>
          <Button use='tertiary' theme='invert' size='l'>
            Button L
          </Button>
          <Button use='tertiary' theme='invert' active>
            Active
          </Button>
          <Button use='tertiary' theme='invert' size='l' loading>
            Loading
          </Button>
          <Button disabled use='tertiary' theme='invert'>Disabled</Button>
          <Button disabled active use='tertiary' theme='invert'>Disabled Active</Button>

          <Button addonLeft={VideoListM} use='tertiary' theme='invert'>Addon Left</Button>
          <Button size='l' use='tertiary' theme='invert'>
            <Button.Text>Addon</Button.Text>
            <Button.Addon>
              <VideoListM />
            </Button.Addon>
          </Button>
          <Button size='l' addonLeft={VideoListM} addonRight={VideoListL} use='tertiary' theme='invert'>Addons</Button>
          <Button addonLeft={VideoListM} title='Button tertiary invert Addon' use='tertiary' theme='invert' />
          <Button use='tertiary' theme='invert'>
            <Button.Text>Button</Button.Text>
            <Button.Addon>
              <Badge bg='--intergalactic-control-primary-success'>new</Badge>
            </Button.Addon>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Demo;
