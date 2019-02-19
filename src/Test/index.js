// @flow
import React from 'react';
import {compose, defaultProps, withHandlers} from 'recompose';
import type {HOC} from 'recompose';

const Test = props => {
	return <div>Hello, {props.title}</div>
}

const enhance: HOC<*, {title: string}> = compose(
	defaultProps({
		prop1: 1,
	}),

	withHandlers({
		h: props => () => console.log(props.prop1),
	})
)

export default enhance(Test);
