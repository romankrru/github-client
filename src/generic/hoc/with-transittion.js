import React from 'react';
import Transition from 'react-transition-group/Transition';
import _ from 'lodash';

export default config => BaseComponent => props => {
  return (
    <Transition
      in={_.isFunction(config.inProp) ? config.inProp(props) : config.inProp}
      // FIXME: Move to settings
      timeout={300}
    >
      {(state) => {
        return (
          <BaseComponent {...props} {...{transitionState: state}} />
        )
      }}
    </Transition>
  )
}