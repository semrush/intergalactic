import React from 'react';
import SpinContainer from '@semcore/spin-container';
import { Text } from '@semcore/typography';
import Dropdown from '@semcore/dropdown';
import Button from '@semcore/button';

class Demo extends React.PureComponent {
  state = { loading: true };

  componentDidMount() {
    this.timerFetch = setInterval(this.fetchData, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerFetch);
    clearInterval(this.timer);
  }

  fetchData = () => {
    this.setState({ loading: false });
    setTimeout(() => {
      this.timer = this.setState({ loading: true });
    }, 1000);
  };

  render() {
    const { loading } = this.state;

    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button>Help me</Button>
        </Dropdown.Trigger>
        <Dropdown.Popper tag={SpinContainer} p={4} size="l" loading={loading} w={290}>
          <Text size={100}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam atque beatae
            distinctio doloremque, et id quae reiciendis repellat saepe sapiente sequi veritatis.
            Adipisci, consequuntur excepturi nobis porro quas recusandae?
          </Text>
        </Dropdown.Popper>
      </Dropdown>
    );
  }
}

export default Demo;
