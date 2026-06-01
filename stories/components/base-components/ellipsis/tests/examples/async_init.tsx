import Link from '@semcore/ui/link';
import React from 'react';

const link = 'https://developer.semrush.com/intergalactic/components/ellipsis/ellipsis';

const Demo = () => {
  const [linkText, setLinkText] = React.useState('');

  React.useEffect(() => {
    const t = setTimeout(() => setLinkText(link), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href={link}
    >
      <Link.Text
        ellipsis:observeChildrenMutations
        w={120}
        size={200}
      >
        {linkText}
      </Link.Text>
    </Link>
  );
};

export default Demo;
