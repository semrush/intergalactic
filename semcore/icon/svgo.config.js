export default {
  plugins: [
    'preset-default',
    {
      name: 'removeAttrs',
      params: {
        attrs: 'fill',
      },
    },
  ],
};