import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Checkbox, DatePicker, Upload, Icon, Radio, Avatar  } from 'antd';
import HeaderContent from './HeaderContent';
import { requestAPI, formItemLayout, spanCol } from '../config';
import { GET_USER, UPDATE_USER  } from '../constant/UrlApi';
import NotFoundComponent from './NotFoundComponent';
import AvatarComponent from './AvatarComponent';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../utils/actions';
import { momentDateUser, formatDateServer } from '../utils/dateUtils';

const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
        dispatch({ type: type, payload: { title: title, content: content, onOK } })
    }
}))

const configRule = {
    name: [
        { required: true, message: "Please input user's name !" }
    ],
    username: [
        { required: true, message: "Please input Username !" }
    ],
    password: [
        { required: true, message: 'Please input password !' },
        { min: 8, message: "Password's length must be at least 8 characters" }
    ],
    confirm: [
        { required: true, message: "Please input confirm password !" }
    ],
    birth: [
        { required: true, message: "Please input your birthday !" }
    ],
    email: [
        { required: true, message: "Please input your E-mail !" },
        { type: 'email', message: "The input is not valid E-mail !" }
    ],
    phone: [
        { required: true, message: "Please input your Phone-number !" },
        { pattern: /^0(1\d{9}|9\d{8})$/, message: "The input is not valid Phone-number !" }
    ],
    cmnd: [
        { required: true, message: "Please input Card ID !" }
    ],
    dateProvided: [
        { required: true, message: "Please input date Card ID provided !" }
    ],
    addressID: [
        { required: true, message: "Please input date Address Card ID provided !" }
    ],
    sex: [
        { required: true, message: "Please input user's sex !" }
    ]
}

const normFile = e => {
    console.log(e)
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

class StudentDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            id: Router.query.id
        }
    }
    componentWillMount() {
        const opt = {
            method: 'GET',
            url: `${GET_USER}/${this.state.id}`
        }
        const getStudent = async () => {
            try {
                const rs = await requestAPI(opt);
                const { data } = rs.data;
                this.setState({ user: data })
            } catch (error) {
                console.log(error)
            }
        }
        getStudent()
    }
    updateUser = (e) => {
        e.preventDefault();
        const { displayDialog, form, displayNotify } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                debugger
                const stuObj = {
                    name: values.name,
                    ngay_sinh: formatDateServer(values.birthDay),
                    cmnd: values.cmnd,
                    ngay_cap: formatDateServer(values.dayProvided),
                    noi_cap: values.addressProvided,
                    phone: values.phone,
                    email: values.email,
                    facebook: values.facebook,
                    zalo: values.zalo,
                    avatar: (values.avatar && values.avatar.length > 0) ? values.avatar[0].thumbUrl : '',
                    gioi_tinh: values.sex,
                }
                const opt = {
                    url: `${UPDATE_USER}/${this.state.id}`,
                    method: 'PUT',
                    data: stuObj
                }
                requestAPI(opt)
                    .then(({data}) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '',() => Router.push('/user'))
                        } else {
                            displayDialog(DIALOG_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({response}) => {
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    render() {
        const { user = null } = this.state;
        const { span, md, lg } = spanCol;
        const { getFieldDecorator } = this.props.form;
        return (
            !user ? <NotFoundComponent />
                : <Fragment>
                    <HeaderContent title="Update User" />
                    <div className="padding-table">
                        <Form  {...formItemLayout} onSubmit={this.updateUser}>
                            <div className="card">
                                <div className="card-header-absolute">User's information :</div>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Student's Name" hasFeedback>
                                            {getFieldDecorator('name', {
                                                initialValue: user.name,
                                                rules: configRule.name
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Birthday" hasFeedback>
                                            {getFieldDecorator('birthDay', {
                                                initialValue: user.ngay_sinh ? 
                                                momentDateUser(user.ngay_sinh) : null
                                            })(
                                                <DatePicker format="DD/MM/YYYY" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="ID Card" hasFeedback>
                                            {getFieldDecorator('cmnd', {
                                                initialValue: user.cmnd,
                                                rules: configRule.cmnd
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Date ID provided" hasFeedback>
                                            {getFieldDecorator('dayProvided', {
                                                initialValue: user.ngay_cap ? 
                                                momentDateUser(user.ngay_cap) : null,
                                                rules: configRule.dateProvided
                                            })(
                                                <DatePicker format="DD/MM/YYYY" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Address ID provided" hasFeedback>
                                            {getFieldDecorator('addressProvided', {
                                                initialValue: user.noi_cap,
                                                rules: configRule.addressID
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Phone number" hasFeedback>
                                            {getFieldDecorator('phone', {
                                                initialValue: user.phone,
                                                rules: configRule.phone
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Email" hasFeedback>
                                            {getFieldDecorator('email', {
                                                initialValue: user.email,
                                                rules: configRule.email
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Facebook" hasFeedback>
                                            {getFieldDecorator('facebook', {
                                                initialValue: user.facebook
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Zalo" hasFeedback>
                                            {getFieldDecorator('zalo', {
                                                initialValue: user.zalo
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Avatar">
                                            {getFieldDecorator('avatar', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: normFile,
                                            })(
                                                // <Fragment>
                                                    <AvatarComponent src={user.avatar} width={50} height={50} size={24} />
                                                    // <Upload multiple={false} name="logo" listType="picture">
                                                    //     <Button>
                                                    //         <Icon type="upload" /> Click to upload
                                                    //     </Button>
                                                    // </Upload>
                                                // </Fragment>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Sex">
                                            {getFieldDecorator('sex', {
                                                initialValue: user.gioi_tinh,
                                                rules: configRule.sex
                                            })(
                                                <Radio.Group>
                                                    <Radio value={1}>Fmale</Radio>
                                                    <Radio value={0}>Male</Radio>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                            <Row type="flex" align="middle" justify="center">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" >
                                        Update Student
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

const WrappedStudentDetail = Form.create()(StudentDetailComponent)

export default connectToRedux(WrappedStudentDetail);