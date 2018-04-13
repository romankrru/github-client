import React from 'react';
import { Loader } from 'semantic-ui-react';

import Portal from '../Portal';

const CustomLoader = props => (
    <Portal>
        <Loader active />
    </Portal>
);

export default CustomLoader;