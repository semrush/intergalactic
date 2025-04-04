declare const preval: any;

const version = preval`module.exports = require('../package.json').version`;

/**
 * Formats string from `access_denied` or `access-denied` to `AccessDenied`
 */
const formatName = (name: string) => {
  return name
    .split(/_|-/)
    .map((el) => el[0].toUpperCase() + el.slice(1))
    .join('');
};

export const getIllustrationPath = (name: string) => {
  const formattedName = formatName(name);

  return `https://static.semrush.com/intergalactic/illustrations/${version}/${formattedName}.svg`;
};
