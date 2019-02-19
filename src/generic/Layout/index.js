// @flow
import * as React from 'react';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import styles from './assets/index.module.css';
import BackToTop from './BackToTop';

const Layout = (props: {
    children: React.Node,
}) => (
    <React.Fragment>
        <Container className={styles.Container}>
            <Menu />
            {props.children}
        </Container>

        <BackToTop />
    </React.Fragment>
);

export default Layout;
