import React, { Component } from 'react';
import Router from 'next/router';
import MenuComponent from '../components/MenuComponent';

class NavComponent extends Component {
    render() {
        const path = Router.route
        return (
            <MenuComponent 
                path={path}   
            />
        )
    }
}

export default NavComponent;