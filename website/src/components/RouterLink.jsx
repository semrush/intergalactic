import React from 'react';
import { Link } from 'react-router-dom';
import LinkUI from '@semcore/link';

const RouterLink = React.forwardRef(function (props, ref) {
  return <LinkUI tag={Link} ref={ref} {...props} />;
});

RouterLink.Addon = LinkUI.Addon;
RouterLink.Text = LinkUI.Text;

export default RouterLink;
