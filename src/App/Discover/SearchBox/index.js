import React from 'react';
import { Form } from 'semantic-ui-react';

const SearchBox = props => (
    <Form>
        <Form.Input
            label='Search by repository'
            placeholder='Search...'
            loading={props.loading}
            value={props.value}
            onChange={props.onChange}
            name="searchBox"
        />
    </Form>
);

export default SearchBox;