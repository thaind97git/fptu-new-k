import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import Router from 'next/router';
import { URL_USER } from '../constant/UrlApi';
import * as storageConfig from '../config/storageConfig';
import * as toast from '../libs/Toast';

const styleForm = {
    backgroundColor: '#f5f5f5',
    padding: '20px 50px',
    boxShadow: '0 8px 16px -8px rgba(241, 144, 0, 0.6)'
}

class LoginComponent extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                axios.post(URL_USER.CHECK_LOGIN, { username: values.username, password: values.password })
                    .then(rs => {
                        if (rs.data.status === 200) {
                            storageConfig.setToken(rs.data.data.token);
                            storageConfig.setUsername(rs.data.data.username);
                            Router.replace({
                                pathname: "/dashboard"
                            })
                        } else {
                            toast.errorToast('Login fail !')
                        }
                    }).catch(err => {
                        toast.errorToast('Some thing wrong !')
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row type="flex" align="middle" justify="center"
                style={{
                    height: '100vh',
                    background: 'url(/static/image/bg2.jpeg) no-repeat',
                    backgroundSize: 'cover',
                    zIndex: 1030
                }}
            >
                <Col xs={20} sm={12} md={12} lg={8} style={styleForm}>
                    <h1 className="align-center"> Admin site FPTU New K</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Row type="flex" align="middle" justify="center">
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        )
    }
}

const WrappedLogin = Form.create()(LoginComponent)
export default WrappedLogin;