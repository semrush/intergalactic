import React from 'react';
import { Link } from 'react-router-dom';
import LinkUI from '@semcore/link';
import propsForElement from '@semcore/core/lib/utils/propsForElement';

const LinkInner = React.forwardRef(function (props, ref) {
  return <Link innerRef={ref} {...propsForElement(props)} />;
});

const RouterLink = React.forwardRef(function (props, ref) {
  return <LinkUI tag={LinkInner} ref={ref} {...props} />;
});

RouterLink.Addon = LinkUI.Addon;
RouterLink.Text = LinkUI.Text;

export default RouterLink;
