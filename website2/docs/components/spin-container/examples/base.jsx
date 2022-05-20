import React from 'react';
import { Text } from '@semcore/typography';
import SpinContainer from '@semcore/spin-container';

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
      <SpinContainer loading={loading} size="l" h={81}>
        {!loading && (
          <Text size={100}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam atque beatae
            distinctio doloremque, et id quae reiciendis repellat saepe sapiente sequi veritatis.
            Adipisci, consequuntur excepturi nobis porro quas recusandae?
          </Text>
        )}
      </SpinContainer>
    );
  }
}

export default Demo;
