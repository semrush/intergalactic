---
title: Code
---

@## Type of use

There are two options how you can use the notices depending on which is more convenient for you and you code style.

@## Option 1

When you call the notice by calling the function. For example, `NoticeBubbleManager.add({ children: "Text"})` – this outputs the notice with the body "Text". This type for calling notices can be used when, for example, you have a websocket triggered and you need to display messages.

@## Option 2

Inserting a component into the render via JSX. For example, `<NoticeBubble visible={visible}>Text</NoticeBubble>` – this will also output a notice with the body "Text". These two examples are identical. This option can be useful when the state for notice display is available. For example, during the first render, or when the connection is failed, or when the notice display somehow depends on the parent component it was inserted in, since the unmount of the parent component will cause the unmount of the notice.

> Under the wrapper, the second JSX option uses the first option via the functions and by subscribing to the component's lifespan and calling the required methods.

❗️ Both options require that you have `<NoticeBubbleContainer />` inserted in some part of your app (but we recommend to insert it at the top of the app). This is a container for all notices, it has `position: fixed`, and all notices get into it.

@## Example when using functions

```jsx
import React from 'react';
import NoticeBubbleManager, { NoticeBubbleContainer } from '@semcore/notice-bubble';

class DemoManager extends React.Component {
  componentDidMount() {
    // Displaying the notice (passing props as an object to the function) and getting its instance
    // The instance has its own unique UID and the update and remove methods
    const notice = NoticeBubbleManager.add({
      children: 'Text',
      duration: 3000,
    });
    setTimeout(() => {
      // Updating the props of the notice via the instance
      notice.update({ children: 'Text is updated' });
      // OR update the props of the notice via the manager, transfering UID, these two codes are identical
      // NoticeBubbleManager.update(notice.uid, { children: 'Text is updated' });
    }, 1000);
  }

  render() {
    return <NoticeBubbleContainer />;
  }
}
```

### Example when using JSX

```jsx
import React from 'react';
import { NoticeBubbleContainer, NoticeBubble } from '@semcore/notice-bubble';

class DemoManager extends React.Component {
  state = {
    visible: true,
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <NoticeBubbleContainer />

        <NoticeBubble duration={3000}>Текст</NoticeBubble>
      </>
    );
  }
}
```

@## Controlled mod

You can control the visibility of the notification yourself. Both through the manager and through the JSX

```jsx
import React from 'react';
import { NoticeBubbleContainer, NoticeBubble } from '@semcore/notice-bubble';

class DemoManager extends React.Component {
  state = {
    visible: true,
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <NoticeBubbleContainer />

        <NoticeBubble
          duration={3000}
          /* It is advisable to change the notice's visible to close it instead
          of removing it from JSX since in this case there will be no animation */
          visible={visible}
          /* onClose will be triggered either by
          a timer or by a user clicking on the cross */
          onClose={() => this.setState({ visible: false })}
        >
          Текст
        </NoticeBubble>
      </>
    );
  }
}
```

```jsx
import React from 'react';
import NoticeBubbleManager, { NoticeBubbleContainer } from '@semcore/notice-bubble';

class DemoManager extends React.Component {
  componentDidMount() {
    // Displaying the notice (passing props as an object to the function) and getting its instance
    // The instance has its own unique UID and the update and remove methods
    const notice = NoticeBubbleManager.add({
      children: 'Text',
      duration: 3000,
      visible: true,
      onClose: () => {
        // Remove the notice via the instance
        notice.remove();
        // OR remove the notice via the manager, these two codes are identical
        // NoticeBubbleManager.remove(notice.uid);
      },
    });
    setTimeout(() => {
      // Updating the props of the notice via the instance
      notice.update({ children: 'Text is updated' });
      // OR update the props of the notice via the manager, transfering UID, these two codes are identical
      // NoticeBubbleManager.update(notice.uid, { children: 'Text is updated' });
    }, 1000);
  }

  render() {
    return <NoticeBubbleContainer />;
  }
}
```

@## NoticeBubble in iframe

Since the component inside the iframe will have a different location from the one we recommend in the guide, you can use [Notice](/components/notice/) instead.
