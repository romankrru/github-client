// @flow
import * as React from 'react';
import Transition from 'react-transition-group/Transition';

import { TRANSITION_TIMEOUT } from '../../settings';

export default (config: {
  inProp: Boolean | Object => Boolean
}) => (BaseComponent: React.ComponentType<any>) => (props: Object) => (
    <Transition
        in={typeof config.inProp === 'function' ? config.inProp(props) : config.inProp}
        timeout={TRANSITION_TIMEOUT}
    >
        {state => <BaseComponent {...props} {...{ transitionState: state }} />}
    </Transition>
);
