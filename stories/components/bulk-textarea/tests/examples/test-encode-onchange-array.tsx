import React from "react";
import BulkTextarea from "@semcore/bulk-textarea";
import { Box, Flex } from "@semcore/flex-box";
import { Text } from "@semcore/typography";

const validateRow = (line: string, lines: string[]) => {
    let isValid = true;
    let errorMessage = '';
  
    if (line.includes(']')) {
      isValid = false;
      errorMessage = 'Please remove one error value';
    } else if (line.includes('[')) {
      isValid = false;
      errorMessage = 'Please fix this value = another error';
    }
  
    return {
      isValid,
      errorMessage,
    };
  };

const lineProcessing = (line: string) => {
  console.log(encodeURI(line));
  return line.replace(/http:\/\//, "").trim();
};

const Demo = () => {
  const [value, setValue] = React.useState<string[]>([]); 

  const handleChange = (v: string | string[]) => {
    const newValue = Array.isArray(v) ? v : v.split("\n");
    console.log("New Array:", newValue);
    setValue(newValue);
  };

  return (
    <Box>
      <BulkTextarea
        w={400}
        value={value} 
        onChange={handleChange} 
        lineValidation={validateRow}
        maxLines={10}
        size={"l"}
        linesDelimiters={[","]}
        readonly={false}
        disabled={false}
        placeholder={"Enter or paste a list using comma or Enter"}
        minRows={2}
        maxRows={10}
        validateOn={["blur"]}
        pasteProps={{
          delimiter: "\n",
          skipEmptyLines: true,
          lineProcessing,
        }}
        lineProcessing={lineProcessing}
      >
        <Flex alignItems="center" justifyContent="flex-start" mb={2} gap={1}>
          <Text tag={"label"} size={300} id={"keywords-label"}>
            Favourite movies
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField
          aria-labelledby={"keywords-label"}
          commonErrorMessage={"Please enter correct movie names."}
        />
        <Flex alignItems="center" justifyContent="space-between" mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>
    </Box>
  );
};

export default Demo;
