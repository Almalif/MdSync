import React from 'react';
import { Menu } from 'semantic-ui-react';

const MenuBar = (saveFile: () => void): React.ReactNode => {
  return (
    <Menu>
      <Menu.Item name="save" onClick={saveFile}>
        Save
      </Menu.Item>
    </Menu>
  );
};

export default MenuBar;
