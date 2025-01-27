import React from 'react';
import SpinContainer from '@semcore/spin-container';
import { Text } from '@semcore/typography';
import Dropdown from '@semcore/dropdown';
import Button from '@semcore/button';

class Demo extends React.PureComponent {
  state = { loading: true, visible: false };
  timer: any;
  textRef = React.createRef<HTMLDivElement>();

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchData = (loading: boolean, visible: boolean) => {
    this.setState({ loading, visible: !visible });
    if (!visible) {
      clearTimeout(this.timer);
      this.setState({ loading: true });
      this.timer = setTimeout(() => {
        this.setState({ loading: false }, () => this.textRef.current?.focus());
      }, 1500);
    }
  };

  render() {
    const { loading, visible } = this.state;

    return (
      <Dropdown onVisibleChange={() => this.fetchData(loading, visible)} visible={visible}>
        <Dropdown.Trigger tag={Button} id='dropdown-trigger'>
          Dropdown with SpinContainer
        </Dropdown.Trigger>
        <Dropdown.Popper
          w={290}
          p={4}
          aria-labelledby='dropdown-trigger'
          tabIndex={loading ? 0 : -1}
        >
          <SpinContainer loading={loading} size={'xl'}>
            <Text size={200} ref={this.textRef} tabIndex={0} style={{ outline: '0' }}>
              The Intergalactic Design System uses two sets of design tokens: basic and semantic.
              Basic tokens set the main colors, while semantic tokens build on them. Changing the
              basic tokens lets you create new themes.
            </Text>
          </SpinContainer>
        </Dropdown.Popper>
      </Dropdown>
    );
  }
}

export default () => <Demo />;
