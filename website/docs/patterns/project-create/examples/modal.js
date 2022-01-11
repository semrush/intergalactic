import React, { useState } from 'react';
import Button from '@semcore/button';
import MathPlusXS from '@semcore/icon/lib/MathPlus/m';
import ProjectCreate from '@semcore/project-create';

const Demo = () => {
  const [visible, changeVisible] = useState(false);
  return (
    <>
      <Button use="primary" onClick={() => changeVisible(!visible)}>
        <Button.Addon tag={MathPlusXS} />
        <Button.Text>Add new Tool Name</Button.Text>
      </Button>
      <ProjectCreate
        hasSharingCheckbox
        visible={visible}
        onClose={() => changeVisible(false)}
        onSubmit={(data) => console.log(data)}
      ></ProjectCreate>
    </>
  );
};

export default Demo;
