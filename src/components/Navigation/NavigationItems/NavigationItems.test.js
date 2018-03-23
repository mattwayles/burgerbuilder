import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

//Enzyme shallow lets us render the component, but the content isn't DEEPLY rendered. Content is just placeholder.
//Helps isolate the tests when we don't want to render all child elements

//Configure an enzyme adapter. Enzyme allows us to isolate components from the whole application
configure({adapter: new Adapter()});

describe(<NavigationItems />, () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    //First test - when isAuthenticated is false (default), test that TWO NavigationItem elements are rendered in NavigationItems
    it('should render 2 NavigationTtem elements if we are NOT authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    //Second test - when isAuthenticated is TRUE, test that THREE NavigationItem elements are rendered in NavigationItems
    it('should render three NavigationTtem elements if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });


    //Third test - when isAuthenticated is TRUE, the LOGOUT link should be present
    it('should render the logout NavigationTtem element if authenticated', () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>));
    });
});