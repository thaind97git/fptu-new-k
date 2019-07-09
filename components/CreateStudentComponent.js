import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Checkbox, DatePicker, Upload, Icon, Radio } from 'antd';
import HeaderContent from '../components/HeaderContent';
import { CREATE_STUDENT } from '../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI, formItemLayout, spanCol } from '../config';

const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content) => {
        dispatch({ type: type, payload: { title: title, content: content } })
    }
}))

function disabledDate(current) {
    var currentTime = current._d;
    return current && current < new Date(currentTime).setFullYear(new Date(currentTime).getFullYear() - 18);
}

const configRule = {
    username: {
        rules: [
            { required: true, message: "Please input Username !" }
        ]
    },
    password: {
        rules: [
            { required: true, message: 'Please input password !' },
            { min: 8, message: "Password's length must be at least 8 characters" }
        ]
    },
    confirm: {
        rules: [
            { required: true, message: "Please input confirm password !" }
        ]
    },
    birth: {
        rules: [
            { required: true, message: "Please input your birthday !" }
        ]
    },
    email: {
        rules: [
            { required: true, message: "Please input your E-mail !" },
            { type: 'email', message: "The input is not valid E-mail !" }
        ]
    },
    phone: {
        rules: [
            { required: true, message: "Please input your Phone-number !" },
            { pattern: /^0(1\d{9}|9\d{8})$/, message: "The input is not valid Phone-number !" }
        ]
    }
}
const normFile = e => {
    debugger;
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const CreateStudentComponent = ({ form, displayNotify, displayDialog }) => {
    const { getFieldDecorator } = form;
    const [loadingButton, setLoadingButton] = useState(false);
    const { span, md, lg } = spanCol;
    const createStudent = (e) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
                const { name, majorGroup, majors, majorCode, active } = values;
                const studentObj = {
                    username: values.username,
                    password: values.password,
                    confirm: values.confirm,
                    name: values.name,
                    ngay_sinh: values.birthDay,
                    cmnd: values.cmnd,
                    ngay_cap: values.dayProvided,
                    noi_cap: values.addressProvided,
                    phone: values.phone,
                    email: values.email,
                    facebook: values.facebook,
                    zalo: values.zalo,
                    avatar: values.upload[0].thumbUrl || '',
                    gioi_tinh: values.sex,
                    so_nha_ten_duong: values.streetAddress,
                    dia_chi_day_du: values.fullAddress
                  }
                setLoadingButton(true);
                const opt = {
                    url: CREATE_STUDENT,
                    method: 'POST',
                    data: majorObj
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        setLoadingButton(false)
                        data && displayDialog(DIALOG_SUCCESS, data.message)
                        form.resetFields()
                    }).catch(({ response }) => {
                        setLoadingButton(false)
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    return (
        <Fragment>
            <HeaderContent title="Create new student" />
            <div className="padding-table">
                <Form  {...formItemLayout} onSubmit={() => createStudent(event)}>
                    <div className="card">
                        <div className="card-header-absolute">Student's Account :</div>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Username" hasFeedback>
                                    {getFieldDecorator('username', configRule.username)(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Password" hasFeedback>
                                    {getFieldDecorator('password', configRule.password)(<Input type="password" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Confirm password" hasFeedback>
                                    {getFieldDecorator('confirm', configRule.confirm)(<Input type="password" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className="card">
                        <div className="card-header-absolute">Student's information :</div>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Student's Name" hasFeedback>
                                    {getFieldDecorator('name')(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                <Form.Item label="Birthday" hasFeedback>
                                    {getFieldDecorator('birthDay', configRule.birth)(
                                        <DatePicker disabledDate={disabledDate} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="ID Card" hasFeedback>
                                    {getFieldDecorator('cmnd', configRule.card)(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col style={{ textAlign: 'left' }} span={span} md={md} lg={lg}>
                                <Form.Item label="Date ID provided" hasFeedback>
                                    {getFieldDecorator('dayProvided', configRule.birth)(
                                        <DatePicker disabledDate={disabledDate} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Address ID provided" hasFeedback>
                                    {getFieldDecorator('addressProvided')(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Phone number" hasFeedback>
                                    {getFieldDecorator('phone', configRule.phone)(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Address street" hasFeedback>
                                    {getFieldDecorator('streetAddress')(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Full address" hasFeedback>
                                    {getFieldDecorator('fullAddress')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Avatar">
                                    {getFieldDecorator('upload', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: normFile,
                                    })(
                                        <Upload multiple={false} name="logo" listType="picture">
                                            <Button>
                                                <Icon type="upload" /> Click to upload
                                            </Button>
                                        </Upload>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Sex">
                                    {getFieldDecorator('sex')(
                                        <Radio.Group>
                                            <Radio value="1">item 1</Radio>
                                            <Radio value="0">item 2</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className="card">
                        <div className="card-header-absolute">Student's Social Network :</div>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Email" hasFeedback>
                                    {getFieldDecorator('email', configRule.email)(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Facebook" hasFeedback>
                                    {getFieldDecorator('facebook')(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={span} md={md} lg={lg}>
                                <Form.Item label="Zalo" hasFeedback>
                                    {getFieldDecorator('zalo')(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Active">
                                {getFieldDecorator('active', {
                                    valuePropName: 'checked',
                                })(<Checkbox>Active</Checkbox>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" justify="center">
                        <Form.Item>
                            <Button loading={loadingButton} type="primary" htmlType="submit" >
                                Create new Student
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </Fragment>
    )
}

const WrappedCreateMajor = Form.create()(CreateStudentComponent)

export default connectToRedux(WrappedCreateMajor);