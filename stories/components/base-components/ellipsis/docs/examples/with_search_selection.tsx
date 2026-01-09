import { Ellipsis } from '@semcore/ui/base-components';
import SearchIcon from '@semcore/ui/icon/Search/m';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const Demo = () => {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [ellipsis, setEllipsis] = React.useState<Ellipsis | undefined>(undefined);
  const [search, setSearch] = React.useState('dev');

  React.useEffect(() => {
    if (ref.current) {
      setEllipsis(new Ellipsis(ref.current, { cropPosition: 'middle' }));
    }
  }, []);

  React.useEffect(() => {
    const from = search.length > 2 ? text.indexOf(search) : -1;
    const to = from !== -1 ? from + search.length : -1;

    if (ellipsis instanceof Ellipsis) {
      ellipsis.setRequiredIndexes([from, to], { background: 'green', fontWeight: 'bold' });
    }
  }, [search, ellipsis]);

  return (
    <>
      <Text ref={ref} ellipsis={ellipsis} w='300px'>
        {text}
      </Text>

      <Input mt={1}>
        <Input.Addon><SearchIcon /></Input.Addon>
        <Input.Value value={search} onChange={setSearch} />
      </Input>
    </>

  );
};

export default Demo;
