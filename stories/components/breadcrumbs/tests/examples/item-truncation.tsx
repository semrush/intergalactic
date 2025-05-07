import React from 'react';
import Breadcrumbs from '@semcore/breadcrumbs';

const Demo = () => (
  <>
  <Breadcrumbs w={600}>
  <Breadcrumbs.Item >
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
    officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
    nulla odio quis recusandae sed, sequi ut!
  </Breadcrumbs.Item>
  <Breadcrumbs.Item wMax={150}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
    officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
    nulla odio quis recusandae sed, sequi ut!
  </Breadcrumbs.Item>
  <Breadcrumbs.Item wMax={150} active>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur assumenda harum
    officia perspiciatis saepe sit? Aliquid consequatur culpa, eligendi harum ipsam molestias
    nulla odio quis recusandae sed, sequi ut!
  </Breadcrumbs.Item>
</Breadcrumbs>


</>

);
export default Demo;
