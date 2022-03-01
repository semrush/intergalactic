import React from 'react';
import Input from "@semcore/input";
import Select, { InputSearch } from "@semcore/select";
import { BarChartSkeleton } from '@semcore/skeleton'
import AmpM from "@semcore/icon/Amp/l";

export default function App() {
  return (
    <div className="App">

      <BarChartSkeleton/>

      <Select>
        <InputSearch />
      </Select>

      <Input>
        <Input.Value />
        <Input.Addon tag={AmpM} />
      </Input>
    </div>
  );
}
