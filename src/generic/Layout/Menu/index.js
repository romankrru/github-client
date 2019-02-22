// @flow
import React from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink, Link} from 'react-router-dom';
import AddStar from './AddStar';

const MainMenu = () => (
	<Menu>
		<Menu.Item as={NavLink} to="/" exact name="Home" />
		<Menu.Item as={NavLink} to="/discover" name="Discover" />

		<Menu.Item>
				<AddStar />
		</Menu.Item>

		<Menu.Menu position="right">
			<Menu.Item as={Link} to="/logout" name="Logout" />
		</Menu.Menu>
	</Menu>
);

export default MainMenu;
