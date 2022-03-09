import React from 'react';
import Link from "@semcore/link";

export default () => [
  <Link>
    <Link.Text>Text</Link.Text>
    <Link.Addon>{"☭"}</Link.Addon>
  </Link>,
  <Link foo="bar" size={100}>
    <Link.Addon>✞</Link.Addon>
    <Link.Text>Text</Link.Text>
    <Link.Addon>✞</Link.Addon>
  </Link>
];
