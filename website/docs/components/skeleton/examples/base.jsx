import React from 'react';
import { Text } from '@semcore/typography';
import Skeleton from '@semcore/skeleton';

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.width = 600;
    this.height = 100;
  }

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
      <div style={{ width: `${this.width}px`, height: `${this.height}px` }}>
        {!loading && (
          <Text size={100}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam atque beatae
            distinctio doloremque, et id quae reiciendis repellat saepe sapiente sequi veritatis.
            Adipisci, consequuntur excepturi nobis porro quas recusandae?
          </Text>
        )}
        <Skeleton hidden={!loading} height={this.height}>
          <Skeleton.Text amount={2} />
          <Skeleton.Text y="40" width="60%" />
        </Skeleton>
      </div>
    );
  }
}

export default Demo;
