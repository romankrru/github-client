import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom';


const MainMenu = props => {
    console.log(props)

    return (
        <Menu>
            <Menu.Item as={NavLink} to="/" name="Home" />
            <Menu.Item as={NavLink} to="/discover" name="Discover"/>

            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/logout" name="Logout" />
            </Menu.Menu>
        </Menu>
    );
};

export default MainMenu;