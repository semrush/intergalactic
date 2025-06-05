import React, { useState } from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Flex } from '@semcore/flex-box';

const loremString = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
          facere iste praesentium quae quia repudiandae tempore! Assumenda
          consequatur cum ducimus, fuga incidunt necessitatibus nulla odit
          placeat praesentium quidem rerum vero? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Ducimus facere iste praesentium quae
          quia repudiandae tempore`;

const Demo = () => {


  return (
    <>
    <Modal disablePortal visible w={400}>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam atque doloribus eius
est harum impedit in inventore iusto magnam molestias nesciunt nobis perferendis, quia sit.
Excepturi itaque officiis ullam?
<Modal disablePortal visible>
  Test nested
</Modal>
</Modal>
    </>
  );
};

export default Demo;


