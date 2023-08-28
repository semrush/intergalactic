---
title: Example
tabs: NoticeBubble('notice-bubble'), A11y('notice-bubble-a11y'), API('notice-bubble-api'), Example('notice-bubble-example'), Changelog('notice-bubble-changelog')
---

Please note that each example uses its own instance of `NoticeBubbleManager`, which can lead to the overlaying of notices from different examples.

## Basic notice

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import Link from '@semcore/ui/link';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to <Link href='#'>Cats from outer space group</Link>
        </>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show basic notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Undo action

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import Link from '@semcore/ui/link';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <>
          Link was moved to <Link href='#'>Cats from outer space group</Link>
        </>
      ),
      action: <Button theme='invert'>Undo</Button>,
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with undo action</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Reload action

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import ReloadM from '@semcore/ui/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Data for 5 new profiles is ready. Please reload the page to view it.',
      action: (
        <Button theme='invert'>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Reload the page</Button.Text>
        </Button>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with reload action</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Loading state

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import Spin from '@semcore/ui/spin';
import { Flex } from '@semcore/ui/flex-box';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex justifyContent='center' gap={1}>
          <Spin size='xs' />
          Loading...
        </Flex>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with centered spinner</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Completion state

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import { Flex } from '@semcore/ui/flex-box';
import CheckM from '@semcore/ui/icon/Check/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: (
        <Flex justifyContent='center' alignItems='center' gap={1}>
          <CheckM color='green-400' />
          Undone
        </Flex>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show notice with completion state</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Success notice

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import CheckM from '@semcore/ui/icon/Check/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      icon: <CheckM color='green-400' />,
      children: 'Keyword was successfully moved to Keyword Analyzer!',
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show success notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Failure notice

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import WarningM from '@semcore/ui/icon/Warning/m';
import ReloadM from '@semcore/ui/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='orange-400' />,
      action: (
        <Button theme='invert'>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Reload the page</Button.Text>
        </Button>
      ),
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show failure notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Dynamic notice (for success/failure states)

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import WarningM from '@semcore/ui/icon/Warning/m';
import ReloadM from '@semcore/ui/icon/Reload/m';
import Spin from '@semcore/ui/spin';
const manager = new NoticeBubbleManager();

let notice = null;

const Demo = () => {
  const tryAgain = async () => {
    if (!notice) return;
    notice.update({
      icon: <Spin size='xs' />,
      children: 'Loading...',
      action: null,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    notice.update({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='orange-400' />,
      action: (
        <Button theme='invert' onClick={tryAgain}>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Try again</Button.Text>
        </Button>
      ),
    });
  };
  const handleClick = async () => {
    if (notice) {
      notice.remove();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    notice = manager.add({
      children: 'Unfortunately, your recent changes were not saved. Try again later.',
      icon: <WarningM color='orange-400' />,
      action: (
        <Button theme='invert' onClick={tryAgain}>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Try again</Button.Text>
        </Button>
      ),
      initialAnimation: true,
      duration: 20000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show dynamic notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## Special events notice

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import MailSent from '@semcore/ui/illustration/MailSent';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Your post is on the way – we will take care!',
      icon: <MailSent />,
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show special event notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## No connection notice

Use `type="warning"` for this case.

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import Spin from '@semcore/ui/spin';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      icon: <Spin size='xs' theme='invert' />,
      children: 'Server connection lost. Reconnecting...',
      type: 'warning',
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show no connection notice</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::

## No connection notice with action

Use `type="warning"` for this case.

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import Button from '@semcore/ui/button';
import ReloadM from '@semcore/ui/icon/Reload/m';

const manager = new NoticeBubbleManager();

const Demo = () => {
  const handleClick = () => {
    manager.add({
      children: 'Server connection lost. Check your internet connection and reload the page.',
      action: (
        <Button theme='invert'>
          <Button.Addon>
            <ReloadM />
          </Button.Addon>
          <Button.Text>Reload the page</Button.Text>
        </Button>
      ),
      type: 'warning',
      initialAnimation: true,
      duration: 3000,
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show no connection notice with action</Button>
      <NoticeBubbleContainer manager={manager} />
    </>
  );
};

</script>

:::
