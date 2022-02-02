import React from 'react';
import Color from 'components/Color';

const group = {
  bright: [
    '--dark-red',
    '--red',
    '--brand-color',
    '--dark-orange',
    '--orange',
    '--light-orange',
    '--yellow',
    '--dark-green',
    '--green',
    '--denim-blue',
    '--light-blue',
    '--cyan',
    '--neon-blue',
    '--dark-violet',
    '--violet',
    '--pink',
  ],
  dim: ['--asphalt', '--wall', '--mist', '--mist-light', '--stone', '--stone-light'],
  gray: ['--gray20', '--gray40', '--gray60', '--gray70', '--gray80'],
  pastel: ['--mercury', '--gray94', '--gray96'],
  additional: [
    '--pinterest',
    '--instagram',
    '--youtube',
    '--facebook',
    '--linkedin',
    '--twitter',
    '--google-my-business',
    '--google-blue',
    '--google-green',
  ],
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
