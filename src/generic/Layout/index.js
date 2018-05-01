// @flow

import * as React from 'react';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import styles from './assets/index.css';

const Layout = (props: {
    children: React.Node,
}) => (
    <Container className={styles.Container}>
        <Menu />
        {props.children}
    </Container>
);

export default Layout;
