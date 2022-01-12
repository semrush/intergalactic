const MAP_RENAME_GROUP = {
  xxs: 'm',
  xs: 'm',
  s: 'm',
  m: 'l',
  xl: 'l',
};
const MAP_RENAME_NAME = {
  AdobeAnalytics: 'AdobeExperienceCloud',
  AmpProject: 'Amp',
  BookmarkOutline: 'Bookmark',
  Bookmark: 'BookmarkFilled',
  FavoriteOutline: 'Favorite',
  Favorite: 'FavoriteFilled',
  FolderOutline: 'Folder',
  Folder: 'FolderFilled',
  FolderOpenOutline: 'FolderOpen',
  FolderOpen: 'FolderOpenFilled',
  GoogleMyBusiness: 'GoogleBusinessProfile',
  TimeHourglass: 'Hourglass',
  LikeOutline: 'Like',
  Like: 'LikeFilled',
  ListCheckAlt: 'ListAddCheck',
  MailOutline: 'Mail',
  Mail: 'MailFilled',
  MailOutlineOpen: 'MailOpen',
  MailOpen: 'MailOpenFilled',
  ActionRedirect: 'Redirect',
  ActionRedo: 'Redo',
  ActionReply: 'Reply',
  ActionReturn: 'Return',
  SEMrush: 'Semrush',
  ActionShare: 'Share',
  ActionStop: 'Stop',
  TagOutline: 'Tag',
  Tag: 'TagFilled',
  ActionUndo: 'Undo',
  NotebookDemo: 'UserDemo',
  SharedToUser: 'UserShared',
  Webpages: 'WebPages',
  TimeWristwatch: 'Wristwatch',
};

//@semcore/icon/Icon/m
//@semcore/icon/pay/Icon/m
function generateNewNameGroup(path) {
  const splited = path.split('/');
  const { length } = splited;
  const group = splited[length - 1];
  const name = splited[length - 2];
  splited[length - 2] = MAP_RENAME_NAME[name] || name;
  splited[length - 1] = MAP_RENAME_GROUP[group] || group;
  return splited.join('/');
}
function generateNewPath(path) {
  const iconsReg = /@semcore\/icon\/lib\//;
  if (iconsReg.test(path)) {
    return path.replace(iconsReg, '@semcore/icon/');
  }
  return path;
}

module.exports = function(fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source);

  // replace group and name icons
  // replace imports without lib
  ast
    .find(j.ImportDeclaration)
    .filter((p) => {
      const importPath = p.value.source.value;
      return /@semcore\/icon\//.test(importPath);
    })
    .replaceWith((p) => {
      const importPath = p.value.source.value;
      let newPath = generateNewNameGroup(importPath);
      newPath = generateNewPath(newPath);
      return j.importDeclaration(p.node.specifiers, j.literal(newPath));
    });

  return ast.toSource();
};
