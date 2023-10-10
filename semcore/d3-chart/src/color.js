/*__semcore-vars__:"./style/var.css"*/
const colors = preval`
  const path = require('path');
  module.exports = require('@semcore/babel-plugin-react-semcore').getColorVars(path.resolve(__dirname, './style/var.css'));
`;

export { colors };
