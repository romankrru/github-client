// @flow
import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

import { programmingLanguages } from '../../../settings';
import type { TFilters } from '../typedefs';

const propgramminLanguagesOptions = programmingLanguages.map(language => ({
    key: language,
    text: language,
    value: language,
}));

const Filter = (props: {
    filters: TFilters,
    handleFilterChange: Function,
    resetFilters: Function,
    isLoading: boolean,
}) => (
    <Segment>
        <Form>
            <h3>Additional filters:</h3>

            <Form.Input
                label="From these owner"
                value={props.filters.user}
                name="user"
                onChange={props.handleFilterChange}
            />

            <Form.Select
                label="Language"
                value={props.filters.language}
                name="language"
                options={propgramminLanguagesOptions}
                onChange={props.handleFilterChange}
            />

            <Form.Input
                placeholder="0...100, >200, 300, etc."
                label="Stars"
                value={props.filters.stars}
                name="stars"
                onChange={props.handleFilterChange}
            />

            <Form.Input
                placeholder="0...100, >200, 300, etc."
                label="Forks"
                value={props.filters.forks}
                name="forks"
                onChange={props.handleFilterChange}
            />

            <Form.Input
                placeholder="Repo size in KB"
                label="Size"
                value={props.filters.size}
                name="size"
                onChange={props.handleFilterChange}
            />

            <Button
                content="Reset filters"
                color="red"
                onClick={props.resetFilters}
                disabled={props.isLoading}
                fluid
            />
        </Form>
    </Segment>
);

export default Filter;
