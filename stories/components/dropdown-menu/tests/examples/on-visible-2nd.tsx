import React from "react";
import DropdownMenu from "@semcore/ui/dropdown-menu";
import Button from "@semcore/ui/button";

const items = ["save", "rename", "delete"];
const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <DropdownMenu
      visible={visible}
      onVisibleChange={(value) => {
        console.log(value);
        setVisible(value);
      }}
    >
      <DropdownMenu.Trigger tag={Button}>Actions</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {items.map((name) => (
          <DropdownMenu.Item
            key={name}
            onClick={() => {
              console.log("clack");

              setVisible(false);
            }}
            tabIndex={0}
          >
            {name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
