---
title: Example
fileSource: spin-container
tabs: Design('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Example('spin-container-code'), Changelog('spin-container-changelog')
---

## Usage in content

::: sandbox

<script lang="tsx">
import React from 'react';
import { Text } from '@semcore/ui/typography';
import SpinContainer from '@semcore/ui/spin-container';

class Demo extends React.PureComponent {
  state = { loading: true };
  timerFetch: any;
  timer: any;

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
      <SpinContainer loading={loading} size='l' h={81}>
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


</script>

:::

## Usage in dropdown lists

This example demonstrates how to resize and display content within the SpinContainer.

::: sandbox

<script lang="tsx">
import React from 'react';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import Dropdown from '@semcore/ui/dropdown';
import Button from '@semcore/ui/button';

class Demo extends React.PureComponent {
  state = { loading: true };
  timerFetch: any;
  timer: any;

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
        <Dropdown.Trigger tag={Button}>Help me</Dropdown.Trigger>
        <Dropdown.Popper tag={SpinContainer} p={4} size='l' loading={loading} w={290}>
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


</script>

:::
