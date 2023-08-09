import React from 'react';
import Color from '@components/Color';

const group = {
  basicPack: [
    '--blue-300',
    '--green-200',
    '--orange-400',
    '--pink-300',
    '--yellow-200',
    '--violet-400',
    '--red-300',
    '--salad-200',
  ],
  secondPack: [
    '--blue-400',
    '--green-300',
    '--orange-200',
    '--pink-400',
    '--yellow-300',
    '--violet-200',
    '--red-400',
    '--salad-300',
  ],
  thirdPack: [
    '--blue-200',
    '--green-400',
    '--orange-300',
    '--pink-200',
    '--yellow-400',
    '--violet-300',
    '--red-200',
    '--salad-400',
  ],
  otherData: ['--gray-200'],
  blue: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500'],
  green: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500'],
  salad: ['--salad-100', '--salad-200', '--salad-300', '--salad-400', '--salad-500'],
  orange: ['--orange-100', '--orange-200', '--orange-300', '--orange-400', '--orange-500'],
  yellow: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500'],
  red: ['--red-100', '--red-200', '--red-300', '--red-400', '--red-500'],
  pink: ['--pink-100', '--pink-200', '--pink-300', '--pink-400', '--pink-500'],
  violet: ['--violet-100', '--violet-200', '--violet-300', '--violet-400', '--violet-500'],
  gray: ['--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500'],
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
