import React from 'react';
import Color from '@components/Color';

const group = {
  brand: ['--orange-400', '--violet-700'],
  main: ['--blue-400', '--green-400', '--orange-400', '--red-400'],
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
  shade50: [
    '--gray-50',
    '--blue-50',
    '--green-50',
    '--salad-50',
    '--orange-50',
    '--yellow-50',
    '--red-50',
    '--pink-50',
    '--violet-50',
  ],
  shade100: [
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
  shade200: [
    '--gray-200',
    '--blue-200',
    '--green-200',
    '--salad-200',
    '--orange-200',
    '--yellow-200',
    '--red-200',
    '--pink-200',
    '--violet-200',
  ],
  shade300: [
    '--gray-300',
    '--blue-300',
    '--green-300',
    '--salad-300',
    '--orange-300',
    '--yellow-300',
    '--red-300',
    '--pink-300',
    '--violet-300',
  ],
  shade400: [
    '--gray-400',
    '--blue-400',
    '--green-400',
    '--salad-400',
    '--orange-400',
    '--yellow-400',
    '--red-400',
    '--pink-400',
    '--violet-400',
  ],
  shade500: [
    '--gray-500',
    '--blue-500',
    '--green-500',
    '--salad-500',
    '--orange-500',
    '--yellow-500',
    '--red-500',
    '--pink-500',
    '--violet-500',
  ],
  shade600: [
    '--gray-600',
    '--blue-600',
    '--green-600',
    '--salad-600',
    '--orange-600',
    '--yellow-600',
    '--red-600',
    '--pink-600',
    '--violet-600',
  ],
  shade700: [
    '--gray-700',
    '--blue-700',
    '--green-700',
    '--salad-700',
    '--orange-700',
    '--yellow-700',
    '--red-700',
    '--pink-700',
    '--violet-700',
  ],
  shade800: [
    '--gray-800',
    '--blue-800',
    '--green-800',
    '--salad-800',
    '--orange-800',
    '--yellow-800',
    '--red-800',
    '--pink-800',
    '--violet-800',
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
