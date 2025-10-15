import figma from '@figma/code-connect/react';
import Notice from '@semcore/ui/notice';

figma.connect(
    Notice.Label,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53929-5660&t=9SvFLXk2pXerGpqA-11',
    {
      variant: { type: 'icon' },
      props: {
        icon: figma.instance('↳ icon'),
      },
      example: ({ icon }) => <Notice.Label>{icon}</Notice.Label>,
    }
  );

figma.connect(
  Notice.Label,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53929-5660&t=9SvFLXk2pXerGpqA-11',
  {
    variant: { type: 'illustration' },
    example: () => <Notice.Label>{/* svg or illustration from the library */}</Notice.Label>,
  }
);

figma.connect(
  Notice,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53929-5721&t=9SvFLXk2pXerGpqA-11',
  {
    props: {
      theme: figma.enum('theme', {
        '🟢 limit': 'success',
        '🔴 danger': 'danger',
        '🟠 warning': 'warning',
        '⚪️ muted': 'muted',
      }),
      actions: figma.boolean('actions', {
        true: figma.children('Button'),
        false: undefined,
      }),
      closable: figma.boolean('closable'),
      title: figma.textContent('↳ title'),
      text: figma.textContent('↳ text'),
    },
    example: ({ theme, title, closable, actions, text }) => <Notice aria-label={/* Add aria-label */} theme={theme} closable={closable}>
        <Notice.Label>{/* svg or illustration from the library */}</Notice.Label>
        <Notice.Content>
        <Notice.Title>
          {title}
        </Notice.Title>
        <Notice.Text>
          {text}
        </Notice.Text>
        <Notice.Actions>
          {actions}
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>,
  },
);

// Notice with custom layout: buttons on the right

figma.connect(
    Notice,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53929-5777&t=9SvFLXk2pXerGpqA-11',
    {
      props: {
        theme: figma.enum('theme', {
          '🟢 limit': 'success',
          '🔴 danger': 'danger',
          '🟠 warning': 'warning',
          '⚪️ muted': 'muted',
        }),
        actions: figma.boolean('actions', {
          true: figma.children('Button'),
          false: undefined,
        }),
        closable: figma.boolean('closable'),
        text: figma.textContent('↳ text'),
        icon: figma.children('Notice.Label'),
      },
      example: ({ theme, closable, actions, text, icon }) => <Notice aria-label={/* Add aria-label */} theme={theme} closable={closable}>
          <Notice.Label>{icon}</Notice.Label>
          <Notice.Content>
          <Notice.Text>
            {text}
          </Notice.Text>
          <Notice.Actions>
            {actions}
          </Notice.Actions>
        </Notice.Content>
        <Notice.Close />
      </Notice>,
    },
  );