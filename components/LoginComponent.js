import React, { Component } from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { URL_USER } from '../constant/UrlApi';
import * as storageConfig from '../config/storageConfig';
import * as toast from '../libs/Toast';
import * as Utils from '../utils/utils';

const styleForm = {
    backgroundColor: '#f5f5f5',
    padding: '20px 50px',
    boxShadow: '0 8px 16px -8px rgba(241, 144, 0, 0.6)'
}

class LoginComponent extends Component {
    state = {
        loadingButton: false
    }
    setLoadingButton = (bool) => {
        this.setState({ loadingButton: bool })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({loadingButton: true})
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(URL_USER.LOGIN, { phone: values.phone, password: values.password })
                .then(rs => {
                    this.setLoadingButton(false);
                    const resp = rs.data;
                    if (!Utils.isEmptyObject(resp.data)) {
                        storageConfig.setUsername(resp.data.username);
                        Utils.redirectURL("/dashboard");
                    }
                    }).catch(err => {
                        this.setLoadingButton(false)
                        if (!!err.response) {
                            const respError = err.response.data;
                            toast.errorToast( respError && respError.errorMessage)
                        } else {
                            toast.warnToast('Có lỗi không xác định !')
                        }
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loadingButton } = this.state;
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
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Phone"
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
                                <Button loading={loadingButton} type="primary" htmlType="submit" className="login-form-button">
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