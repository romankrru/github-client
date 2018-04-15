import React from 'react';
import { Form, Segment } from 'semantic-ui-react'

import { programmingLanguages } from '../../../settings';

const propgramminLanguagesOptions = programmingLanguages.map(language => ({
    key: language,
    text: language,
    value: language,
}));

const Filter = props => {
    return (
        <Segment>
            <Form>
                <h3>Additional filters:</h3>

                <Form.Select
                    label='Language'
                    defaultValue="JavaScript"
                    options={propgramminLanguagesOptions}
                />

                <Form.Select
                    label='Stars'
                    defaultValue="JavaScript"
                    options={propgramminLanguagesOptions}
                />
            </Form>
        </Segment>
    );
};

export default Filter;