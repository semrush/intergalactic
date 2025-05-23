import React from 'react';
import { Plot, Line, minMax, PlotSummarizerConfig } from '@semcore/d3-chart';
import { scaleLinear } from 'd3-scale';

const a11yAltTextConfig: PlotSummarizerConfig = {
  titlesFormatter: (title) => {
    if (title === 'y') return 'Money volume';
    if (title === 'x') return 'Time';
  },
  valuesFormatter: (value, column) => {
    if (column === 'y') {
      return `$${Number(value).toFixed(2)}`;
    }
    if (column === 'x') {
      return `${value} s.`;
    }
  },
  override: 'text'

};

const a11yAltTextConfig1: PlotSummarizerConfig = {
  titlesFormatter: (title) => {
    if (title === 'y') return 'Money volume';
    if (title === 'x') return 'Time';
  },
  valuesFormatter: (value, column) => {
    if (column === 'y') {
      return `$${Number(value).toFixed(2)}`;
    }
    if (column === 'x') {
      return `${value} s.`;
    }
  },
  override: 'text',
  
  // Добавление новых пропсов
  trendTangens: {
    static: 1 / 2, // Пример значения для сильных трендов
    weak: 1 / 5, // Пример значения для слабых трендов
    medium: 1 / 3, // Пример значения для средних трендов
    strong: Infinity, // Пример значения для сильных трендов
  },
  movingAverage: {
    longSize: Math.sqrt(20),  // Пример размера длинного скользящего среднего
    shortSize: Math.sqrt(20) / 2, // Пример размера короткого скользящего среднего
    notableDiff: 10, // Пример значимости для смены тренда
  },
  dataType: 'points-cloud', // Тип данных, например, временные ряды
  clustersGridSize:1, // Размер сетки для кластеров
  maxListSymbols: 10, // Ограничение на количество символов в списках
  datesWithTime: true, // Всегда добавлять время к датам в альтернативном тексте
  clustersLimit: 0, // Ограничение на количество описанных кластеров
  valuesLimit: 5, // Ограничение на количество описанных значений
  groupsLimit: 1, // Ограничение на количество описанных групп
  additionalFields: ['extraData1', 'extraData2'], // Дополнительные поля для описания данных
};

const eventEmitter = new (class PlotEventEmitterMock {
  on() {}
  off() {}
  emit() {}
})();

const Demo = () => {
  const width = 300;
  const height = 200;

  const xScale = scaleLinear().range([0, width]).domain(minMax(data, 'x'));
  const yScale = scaleLinear().range([height, 0]).domain(minMax(data, 'y'));

  return (
    <>
    <Plot
      data={data}
      scale={[xScale, yScale]}
      width={width}
      height={height}
      label="Last market trends with pattern"
      locale="en-US"
      a11yAltTextConfig={a11yAltTextConfig1}
      patterns
    >
      <Line x="x" y="y" />
    </Plot>

<Plot
data={data}
scale={[xScale, yScale]}
width={400}
height={400}
locale="en-US"
a11yAltTextConfig={a11yAltTextConfig}

>
<Line x="x" y="y" />
</Plot>
</>
  );
};

const data = Array(20)
  .fill({})
  .map((_, i) => ({
    x: i,
    y: Math.sin(i / 2) * 5 + 5,
  }));

export default Demo;
