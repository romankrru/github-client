import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Layout from '../';

describe('Layout', () => {
    it('should render correctly', () => {
        const output = shallow(<Layout />);

        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
