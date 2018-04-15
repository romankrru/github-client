import React from 'react';
import { Form } from 'semantic-ui-react';


const SearchBox = props => {
    return (
        <Form>
            <Form.Input
                label='Search by user or organisation'
                placeholder='Search...'
                loading={props.loading}
                value={props.value}
                onChange={props.onChange}
                name="searchBox"
            />
        </Form>
    );
};

export default SearchBox;