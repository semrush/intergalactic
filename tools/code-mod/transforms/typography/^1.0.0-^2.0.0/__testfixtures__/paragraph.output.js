import React from 'react';
import { Text } from "@semcore/typography";

export default () => [
  <Text tag={'span'} size={100} m={0}>Text text text</Text>,
  <Text size={200} tag={"p"} m={0}>Text text text</Text>,
  <Text size={300} m={"0 0 24px 0"} tag={"p"}>Text text text</Text>,
  <Text size={100} m={0} tag={"p"}>Text text text</Text>,
  <Text size={200} m={"0 0 20px 0"} tag={"p"}>Text text text</Text>,
  <Text size={300} tag={"p"} m={0}>Text text text</Text>,
];
