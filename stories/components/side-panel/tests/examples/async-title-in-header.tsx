import Button from '@semcore/ui/button';
import SidePanel from '@semcore/ui/side-panel';
import React, { useEffect, useState } from 'react';

const title = 'My Article Title';

type AsyncTitleProps = {
  initialTitle: string | null;
  title: string | null;
};

function AsyncTitle({ initialTitle, title }: AsyncTitleProps) {
  const [text, setText] = useState<string | null>(initialTitle);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setText(title);
      setInitialized(true);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, []);

  const titleText = initialized ? text ?? '' : initialTitle ?? '';
  const titleKey = initialized ? 'text' : 'initText';

  return (
    <SidePanel.Title key={titleKey} w={80} ellipsis:observeChildrenMutations>
      {titleText}
    </SidePanel.Title>
  );
}

type DemoProps = {
  name: string;
  title: React.ReactNode;
};

function Demo({ name, title }: DemoProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>{name}</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)}>
        <SidePanel.Panel>
          <SidePanel.Header>
            {title}
          </SidePanel.Header>
          <div style={{ padding: 24 }}>Content</div>
        </SidePanel.Panel>
      </SidePanel>
    </div>
  );
}

export function App() {
  return (
    <>
      <Demo
        name='Show SidePanel with cleared title'
        title={<AsyncTitle initialTitle={title} title={null} />}
      />
      <Demo
        name='Show SidePanel with async title'
        title={<AsyncTitle initialTitle={null} title={title} />}
      />
    </>
  );
}

export default App;
