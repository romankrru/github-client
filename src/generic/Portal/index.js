import ReactDOM from 'react-dom';
import { compose, withProps, lifecycle } from 'recompact';

const Portal = props => ReactDOM.createPortal(props.children, props.container);

export default compose(
    withProps({
        rootSelector: document.body,
        container: document.createElement('div'),
    }),

    lifecycle({
        componentDidMount() {this.props.rootSelector.appendChild(this.props.container)},
        componentWillUnmount() {this.props.rootSelector.removeChild(this.props.container)},
    }),
)(Portal);