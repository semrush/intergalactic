import React from 'react';
import Tag from '@semcore/tag';
import Input from '@semcore/input';
import OutsideClick from '@semcore/outside-click';
import CheckS from '@semcore/icon/lib/Check/m';

const Demo = () => {
  const inputRef = React.useRef(null);
  const [value, updateValue] = React.useState('Default tag');
  const [dirtyValue, updateDirtyValue] = React.useState(null);
  const [edited, updateEdited] = React.useState(false);

  const changeEdited = () => {
    updateEdited(!edited);
    !edited && updateDirtyValue(value);
  };

  const setValueAndCloseInput = () => {
    changeEdited();
    updateValue(dirtyValue);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setValueAndCloseInput();
    }
    if (e.keyCode === 27) changeEdited();
  };

  return (
    <>
      {!edited && (
        <Tag wMax={150} interactive onClick={changeEdited}>
          <Tag.Text>{value}</Tag.Text>
          <Tag.Close onClick={(e) => e.stopPropagation()} />
        </Tag>
      )}
      {edited && (
        <Input wMax={150} ref={inputRef}>
          <OutsideClick excludeRefs={[inputRef]} onOutsideClick={changeEdited} />
          <Input.Addon>tag:</Input.Addon>
          <Input.Value
            value={!!dirtyValue ? dirtyValue : value}
            autoFocus
            onChange={updateDirtyValue}
            onKeyDown={handleKeyDown}
          />
          <Input.Addon tag={CheckS} interactive onClick={setValueAndCloseInput} />
        </Input>
      )}
    </>
  );
};

export default Demo;
