import React from 'react';
import Color from 'components/Color';

const group = {
  chart: ['#2BB3FF', '#59DDAA', '#FF622D', '#F67CF2', '#FDC23C', '#AB6CFE', '#FF8786', '#9BD85D'],
  'second-pack': [
    '#008FF8',
    '#00C192',
    '#FFB26E',
    '#E14ADF',
    '#EF9800',
    '#DCB8FF',
    '#FF4953',
    '#66C030',
  ],
  'third-pack': [
    '#8ECDFF',
    '#009F81',
    '#FF8C43',
    '#FFA9FA',
    '#D87900',
    '#C695FF',
    '#FFAEB5',
    '#35A21E',
  ],
  'other-data': ['#C4C7CF'],
};

export default function (props) {
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
