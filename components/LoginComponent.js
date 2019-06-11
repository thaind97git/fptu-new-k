import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Row, Col, Typography } from 'antd';
import Router from 'next/router';
import { URL_USER } from '../constant/UrlApi';
import * as storageConfig from '../config/storageConfig';

const styleForm = {
    backgroundColor: '#f5f5f5',
    padding: '20px 50px',
}

const { Title } = Typography;

class LoginComponent extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                axios.post(URL_USER.CHECK_LOGIN, {username: values.username, password: values.password})
                .then(rs => {
                    if (rs.data.status === 200) {
                        storageConfig.setToken(rs.data.data.token);
                        storageConfig.setUsername(rs.data.data.username);
                        Router.replace({
                            pathname: "/dashboard"
                        })
                    }
                }).catch(err => {
                    console.log(err)
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
                    background:'url(/static/image/bg2.jpeg) no-repeat', 
                    backgroundSize: 'cover',
                    zIndex: 1030
                }}
            >
                <Col xs={20} sm={8} md={8} style={styleForm}>
                    <Title level={2} > <div>&nbsp;</div> <span>&nbsp;</span> Admin site FPTU New K</Title>
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