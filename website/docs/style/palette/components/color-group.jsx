import React from 'react';
import Color from 'components/Color';

const group = {
  bright: [
    '--blue-500',
    '--green-500',
    '--salad-500',
    '--orange-500',
    '--yellow-500',
    '--red-500',
    '--pink-500',
    '--violet-500',
  ],
  gray: [
    '--gray-50',
    '--gray-100',
    '--gray-200',
    '--gray-300',
    '--gray-400',
    '--gray-500',
    '--gray-600',
    '--gray-700',
    '--gray-800',
  ],
  pastel: [
    '--gray-100',
    '--blue-100',
    '--green-100',
    '--salad-100',
    '--orange-100',
    '--yellow-100',
    '--red-100',
    '--pink-100',
    '--violet-100',
  ],
  additional: [
    '--brand-color',
    '--pinterest',
    '--instagram',
    '--youtube',
    '--facebook',
    '--linkedIn',
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
