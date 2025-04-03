import React from "react";
import Select from "@semcore/select";
import { ScreenReaderOnly } from "@semcore/flex-box";
import { Text } from "@semcore/typography";
import { Flex } from "@semcore/flex-box";

const Demo = () => {
  const [filter, setFilter] = React.useState("");
  const options = React.useMemo(
    () =>
      data.filter((option) => {
        return option.value
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase());
      }),
    [filter]
  );

  return (
    <Flex direction="column">
      <Text tag="label" size={200} htmlFor="options-filtering-select">
        Fruit
      </Text>
      <Select placeholder="Select a fruit">
        <Select.Trigger id="options-filtering-select" mr="auto" mt={2} />
        <Select.Popper aria-label={"Fruits with search"}>
          <Select.InputSearch
            value={filter}
            onChange={(v) => {
              setFilter(v);
              console.log("v", v, Date.now());
            }}
            aria-describedby={filter ? "search-result" : undefined}
          />
          <Select.List hMax={"224px"}>
            {options.map(({ value, label }) => (
              <Select.Option value={value} key={value}>
                {label}
              </Select.Option>
            ))}
            {options.length ? (
              <ScreenReaderOnly id="search-result" aria-hidden={"true"}>
                {options.length} result{options.length > 1 && "s"} found
              </ScreenReaderOnly>
            ) : (
              <Text
                tag={"div"}
                id="search-result"
                key="Nothing"
                p={"6px 8px"}
                size={200}
                use={"secondary"}
              >
                Nothing found
              </Text>
            )}
          </Select.List>
        </Select.Popper>
      </Select>
    </Flex>
  );
};

const data = [
  "Apple",
  "Banana",
  "Blueberry",
  "Grape",
  "Kiwi",
  "Mango",
  "Melon",
  "Orange",
  "Peach",
  "Pear",
  "Pineapple",
  "Strawberry",
].map((item) => ({
  label: item,
  value: item,
}));

export default Demo;

export const App = () => <Demo />;
