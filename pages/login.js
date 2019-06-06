import React, { Component } from 'react';
import LoginComponent from '../components/LoginComponent';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import LoadingComponent from '../components/LoadingComponent';
import { bindActionCreators } from 'redux';
import AuthenHOC from '../HOC/authenHOC';
import Router from 'next/router';
import * as UserState from '../store/UserState';

const connectToRedux = connect(
    pick(['isLoggedIn']),
    dispatch => ({
        userAction: bindActionCreators(UserState, dispatch)
    })
)

class LoginPage extends Component {
    componentDidMount() {
        const { checkLogin } = this.props.userAction
        checkLogin();
    }
    render() {
        return (
            <LoginComponent/>
        )
    }

}
export default (connectToRedux(LoginPage));