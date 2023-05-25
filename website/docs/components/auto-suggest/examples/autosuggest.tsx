import React from 'react';
import Select from '@semcore/ui/select';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import { Box } from '@semcore/ui/flex-box';

const Highlight = ({ highlight, children }) => {
  let html = children.toLowerCase();
  if (highlight) {
    const re = new RegExp(highlight.toLowerCase(), 'g');
    html = html.replace(re, `<span style="font-weight: bold; padding: 2px 0">${highlight}</span>`);
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const debounce = (func, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

const fetchData = async (query) => {
  if (!query) return [];
  const response = await fetch(`https://suggestions.semrush.com/?type=domain&q=${query}`);
  if (response.ok) {
    const data = await response.json();
    if (data.results.length === 0) return [];
    return data.results.map((item) => item.value).map((value) => ({ value, title: value }));
  } else {
    const error = await response.json();
    console.error(error);
  }
};

const Demo = () => {
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const loadSuggestions = React.useCallback(
    debounce((query) => fetchData(query).then((suggestions) => setSuggestions(suggestions)), 300),
    [],
  );
  React.useEffect(() => {
    loadSuggestions(query);
  }, [query]);

  return (
    <>
      <Text tag="label" size="200" htmlFor="website-autosuggest">
        Your website
      </Text>
      <Box mt={2}>
        <Select id="website-autosuggest" interaction="focus" onChange={setQuery} value={query}>
          <Select.Trigger tag={Input}>
            {() => (
              <Input.Value
                value={query}
                role="combobox"
                placeholder="Type domain or URL"
                onChange={setQuery}
              />
            )}
          </Select.Trigger>
          {suggestions.length > 0 && (
            <Select.Menu>
              {suggestions.map((option) => (
                <Select.Option value={option.value} key={option.value}>
                  <Highlight highlight={query}>{option.title}</Highlight>
                </Select.Option>
              ))}
            </Select.Menu>
          )}
        </Select>
      </Box>
    </>
  );
};
export default Demo;
