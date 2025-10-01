import Button from '@semcore/ui/button';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

class Demo extends React.PureComponent {
  state = { loading: true };

  render() {
    const { loading } = this.state;

    return (
      <>
        <SpinContainer loading={loading} size='l' aria-live='polite' role='status'>
          <Text size={200} tag='div'>
            The Intergalactic Design System uses two sets of design tokens: basic and semantic.
            Basic tokens set the main colors, while semantic tokens build on them. Changing the
            basic tokens lets you create new themes.
          </Text>
        </SpinContainer>
        <Button onClick={() => this.setState({ loading: !loading })} mt={3}>
          {loading ? 'Stop loading' : 'Start loading'}
        </Button>
      </>
    );
  }
}

export default () => <Demo />;
