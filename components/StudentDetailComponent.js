import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Checkbox, DatePicker, Upload, Icon, Radio, Avatar, Select  } from 'antd';
import HeaderContent from './HeaderContent';
import { requestAPI, formItemLayout, spanCol } from '../config';
import { GET_STUDENT, UPDATE_STUDENT } from '../constant/UrlApi';
import NotFoundComponent from './NotFoundComponent';
import AvatarComponent from './AvatarComponent';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR, TOAST_SUCCESS } from '../utils/actions';
import { momentDateUser, formatDateServer } from '../utils/dateUtils';
import { Provinces } from '../config';
const { Option } = Select;
const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content, onOK) => {
        dispatch({ type: type, payload: { title, content, onOK } })
    }
}))

const configRule = {
    name: [
        { required: true, message: "Please input Username !" }
    ],
    birth: [
        { required: true, message: "Please input your birthday !" }
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
    ]
}

const normFile = e => {
    debugger;
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
class StudentDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            id: Router.query.id
        }
    }
    componentWillMount() {
        const opt = {
            method: 'GET',
            url: `${GET_STUDENT}/${this.state.id}`
        }
        const getStudent = async () => {
            try {
                const rs = await requestAPI(opt);
                const { data } = rs.data;
                this.setState({ student: data })
            } catch (error) {
                console.log(error)
            }
        }
        getStudent()
    }
    createStudent = (e) => {
        e.preventDefault();
        const { displayDialog, form, displayNotify } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const stuObj = {
                    name: values.name || "",
                    ngay_sinh: formatDateServer(values.birthDay),
                    cmnd: values.cmnd || "",
                    ngay_cap: formatDateServer(values.dayProvided),
                    noi_cap: +values.addressProvided,
                    phone: values.phone || "",
                    avatar: values.avatar || "",
                    gioi_tinh: values.sex,
                    so_nha_ten_duong: values.streetAddress || "",
                    dia_chi_day_du: values.fullAddress || "",
                    id_tinh_thanh_pho_lien_he: 0,
                    id_quan_huyen_lien_he: 0,
                    id_phuong_xa_lien_he: 0,
                    id_truong_thpt: 0,
                    id_tinh_thanh_pho_truong_thpt: 0,
                    id_quan_huyen_truong_thpt: 0,
                    ho_ten_bo: "string",
                    dien_thoai_bo: "string",
                    nghe_nghiep_bo: "string",
                    ho_ten_me: "string",
                    dien_thoai_me: "string",
                    nghe_nghiep_me: "string"
                }
                const opt = {
                    url: `${UPDATE_STUDENT}/${this.state.id}`,
                    method: 'PUT',
                    data: stuObj
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '',() => Router.push('/student'))
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
        const { student = null } = this.state;
        const { span, md, lg } = spanCol;
        const { getFieldDecorator } = this.props.form;
        return (
            !student ? <NotFoundComponent />
                : <Fragment>
                    <HeaderContent title="Update Student" />
                    <div className="padding-table">
                        <Form  {...formItemLayout} onSubmit={this.createStudent}>
                            <div className="card">
                                <div className="card-header-absolute">Student's information :</div>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Student's Name">
                                            {getFieldDecorator('name', {
                                                initialValue: student.name,
                                                rules: configRule.name
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Birthday" hasFeedback>
                                            {getFieldDecorator('birthDay', {
                                                initialValue: student.ngay_sinh ? 
                                                momentDateUser(student.ngay_sinh) : null,
                                                rules: configRule.birth
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
                                                initialValue: student.cmnd,
                                                rules: configRule.cmnd
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                        <Form.Item label="Date ID provided" hasFeedback>
                                            {getFieldDecorator('dayProvided', {
                                                initialValue: student.ngay_cap ? 
                                                momentDateUser(student.ngay_cap) : null,
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
                                                initialValue: student.noi_cap,
                                                rules: configRule.addressID
                                            })(
                                                <Select 
                                                    showSearch 
                                                    optionFilterProp="children"
                                                    placeholder="Please select address Card ID provided">
                                                    {
                                                        Provinces.map(item => {
                                                            return <Option key={item.key} value={item.key}>
                                                                    { item.value.name }
                                                                </Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Phone number" hasFeedback>
                                            {getFieldDecorator('phone', {
                                                initialValue: student.phone,
                                                rules: configRule.phone
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Address street" hasFeedback>
                                            {getFieldDecorator('streetAddress', {
                                                initialValue: student.so_nha_ten_duong
                                            })(<Input />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Full address" hasFeedback>
                                            {getFieldDecorator('fullAddress', {
                                                initialValue: student.dia_chi_day_du
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Avatar">
                                            {getFieldDecorator('avatar')(
                                                <Avatar src={student.avatar} size="large" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={span} md={md} lg={lg}>
                                        <Form.Item label="Sex">
                                            {getFieldDecorator('sex', {
                                                initialValue: student.gioi_tinh
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