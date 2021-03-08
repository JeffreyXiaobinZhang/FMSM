import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';

const NavBarProject: React.FC = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
            <img src="/assets/brighten.jpg" alt="logo" style={{marginRight: 10}}/>
            FSMS
         </Menu.Item>
         <Dropdown item text='BDOD'>
         <Dropdown.Menu> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project' text='Query Project' icon='edit'/> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project-create' text='Create Project' icon='write'/> 
         </Dropdown.Menu> 
         </Dropdown> 
         <Dropdown item text='FTTB'>
         <Dropdown.Menu> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project' text='Query Project' icon='edit'/> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project-create' text='Create Project' icon='write'/> 
         </Dropdown.Menu> 
         </Dropdown> 
      </Container>
    </Menu>
  );
};

export default observer(NavBarProject);
