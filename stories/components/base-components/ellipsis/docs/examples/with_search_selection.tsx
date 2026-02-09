import SearchIcon from '@semcore/icon/Search/m';
import { Flex, Ellipsis } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';
const highlightStyle = {
  background: 'var(--intergalactic-bg-highlight-results, #ef980066)',
};
const minSearchLength = 3;

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
    const from = search.length >= minSearchLength
      ? text.indexOf(search)
      : -1;
    const to = from !== -1 ? from + search.length : -1;

    if (ellipsis instanceof Ellipsis) {
      ellipsis.setRequiredIndexes([from, to], highlightStyle);
    }
  }, [search, ellipsis]);

  return (
    <Flex direction='column' gap={4}>
      <Text tag='label' size={200}>
        {`Enter at least ${minSearchLength} characters to search:`}
        <Input mt={2}>
          <Input.Addon><SearchIcon /></Input.Addon>
          <Input.Value value={search} onChange={setSearch} />
        </Input>
      </Text>

      <Text ref={ref} ellipsis={ellipsis} w='300px' size={200}>
        {text}
      </Text>
    </Flex>

  );
};

export default Demo;
