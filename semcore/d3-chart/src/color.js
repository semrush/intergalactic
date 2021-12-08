/*__semcore-vars__:"./style/var.css"*/
const colors = preval`
  const path = require('path');
  module.exports = require('@semcore/babel-plugin-react-semcore/utils/vars')(path.resolve(__dirname, './style/var.css'));
`;

let componentRenderIndex = 0;
const cache = {};
const colorValues = Object.keys(colors).sort((a, b) => {
  return parseInt(a.match(/[0-9]/g).join(''), 10) - parseInt(b.match(/[0-9]/g).join(''), 10);
});

export { colors };
export default function getColor(key) {
  if (cache[key]) {
    return cache[key];
  }
  const color = colors[colorValues[componentRenderIndex++]];
  cache[key] = color;
  return color;
}
