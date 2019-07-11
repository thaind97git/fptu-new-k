import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Checkbox } from 'antd';
import HeaderContent from '../components/HeaderContent';
import { CREATE_MAJOR } from '../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR } from '../utils/actions';
import { requestAPI } from '../config/index';

const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} }})
    },
    displayDialog: (type, title, content) => {
        dispatch({ type: type, payload: { title: title, content: content } })
    }
}))

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 4 },
        lg: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 20 },
        lg: { span: 18 }
    },
};

const spanCol = {
    span: 24,
    md: 24,
    lg: 12
}

const CreateMajorComponent = ({ form, displayNotify, displayDialog }) => {
    const { getFieldDecorator } = form;
    const [loadingButton, setLoadingButton] = useState(false);
    const { span, md, lg } = spanCol;
    const createMajor = (e) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { name, majorGroup, majors, majorCode, active } = values;
                const majorObj = {
                    ma_nganh: majorCode,
                    nhom_nganh: majors || '',
                    name: name || '',
                    to_hop_mon: majorGroup || '',
                    creator: 0,
                    created: new Date().getTime(),
                    status: 0
                }
                setLoadingButton(true);
                const opt = {
                    url: CREATE_MAJOR,
                    method: 'POST',
                    data: majorObj
                }
                requestAPI(opt)
                    .then(({data}) => {
                        setLoadingButton(false)
                        data && displayDialog(DIALOG_SUCCESS, data.message)
                        form.resetFields()
                    }).catch(({response}) => {
                        setLoadingButton(false)
                        response && displayNotify(TOAST_ERROR, 'Có lỗi xảy ra')
                    })
            }
        });
    }
    return (
        <Fragment>
            <HeaderContent title="Create new major" />
            <div className="padding-table">
                <Form  {...formItemLayout} onSubmit={() => createMajor(event)}>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Tên ngành" hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: "Vui lòng nhập tên ngành !" }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Mã ngành" hasFeedback>
                                {getFieldDecorator('majorCode', {
                                    rules: [
                                        { required: true, message: 'Vui lòng nhập mã ngành!', }
                                    ],
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Tổ hợp môn" hasFeedback>
                                {getFieldDecorator('majors', {
                                    rules: [
                                        { required: true, message: "Vui lòng nhập tổ hợp môn !" }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Nhóm ngành" hasFeedback>
                                {getFieldDecorator('majorGroup', {
                                    rules: [
                                        { required: true, message: "Vui lòng nhập nhóm ngành !" }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
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
                                Create new major
                        </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </Fragment>
    )
}

const WrappedCreateMajor = Form.create()(CreateMajorComponent)

export default connectToRedux(WrappedCreateMajor);