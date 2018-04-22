import React from 'react';
import Transition from 'react-transition-group/Transition';
import _ from 'lodash';

import { TRANSITION_TIMEOUT } from '../../settings'

export default config => BaseComponent => props => (
  <Transition
    in={_.isFunction(config.inProp) ? config.inProp(props) : config.inProp}
    timeout={TRANSITION_TIMEOUT}
  >
    {(state) => <BaseComponent {...props} {...{transitionState: state}} />}
  </Transition>
);