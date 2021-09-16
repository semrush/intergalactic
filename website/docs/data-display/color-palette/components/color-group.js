import React from 'react';
import Color from 'components/Color';

const group = {
  chart: ['#50aef4', '#3ab011', '#ff8e29', '#890c85', '#e91e25', '#ffc83f'],
  'chart-light-1': ['#91c7ef', '#91d27b', '#fec089', '#c783c5', '#f69498', '#ffdb93'],
  'chart-dark-1': ['#0e75c2', '#278707', '#da6905', '#6e026b', '#bd0000', '#e4aa18'],
  'chart-light-2': ['#d1e8f8', '#d1edc8', '#ffe5cd', '#e7cbe6', '#fbd2d3', '#ffebb9'],
  'chart-dark-2': ['#084c80', '#1a6700', '#a14e03', '#4d024b', '#830005', '#e4aa18'],
};

export default function(props) {
  const colors = group[props.group];
  if (!colors) {
    return `Group "${props.group}" not found`;
  }
  return (
    <div style={{ marginBottom: 32 }}>
      {colors.map((colorName, i) => {
        return (
          <Color
            key={i}
            style={{ margin: 4, width: 48, height: 48, borderRadius: 6 }}
            name={colorName}
          />
        );
      })}
    </div>
  );
}
