import React from 'react';
import { Form, Segment } from 'semantic-ui-react'

const options = [
    { key: 'JavaScript', text: 'JavaScript', value: 'JavaScript' },
    { key: 'Elm', text: 'Elm', value: 'Elm' },
];

const Filter = props => {
    return (
        <Segment>
            <Form>
                <h3>Additional filters:</h3>

                <Form.Select
                    label='Language'
                    defaultValue="JavaScript"
                    options={options}
                />

                <Form.Select
                    label='Stars'
                    defaultValue="JavaScript"
                    options={options}
                />
            </Form>
        </Segment>
    );
};

export default Filter;