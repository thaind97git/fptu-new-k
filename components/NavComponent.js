import React, { Component } from 'react';
import Router from 'next/router';
import MenuComponent from '../components/MenuComponent';

class NavComponent extends Component {
    render() {
        const path = Router.route //'/' + Router.route.split('/')[Router.route.split('/').length - 1]
        console.log(path)
        return (
            <MenuComponent 
                path={path}   
            />
        )
    }
}

export default NavComponent;