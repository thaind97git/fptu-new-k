import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row, Checkbox, Select } from 'antd';
import HeaderContent from '../components/HeaderContent';
import { CREATE_MAJOR } from '../constant/UrlApi';
import { DIALOG_SUCCESS, TOAST_ERROR, DIALOG_ERROR } from '../utils/actions';
import { requestAPI, formItemLayout, spanCol } from '../config';
import { TO_HOP_MON } from '../constant/constants';

const { Option } = Select;
const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    displayDialog: (type, title, content) => {
        dispatch({ type: type, payload: { title: title, content: content } })
    }
}))

const configRule = {
    code: [
        { required: true, message: "Please input major's code !" }
    ],
    name: [
        { required: true, message: "Please input major's name !" }
    ],
    group: [
        { required: true, message: "Please input group's major !" }
    ],
    to_hop: [
        { required: true, message: 'Please input subject combination !' },
    ],
    created: [
        { required: true, message: "Please input date created !" }
    ]
}


const CreateMajorComponent = ({ form, displayNotify, displayDialog }) => {
    const { getFieldDecorator } = form;
    const [loadingButton, setLoadingButton] = useState(false);
    const { span, md, lg } = spanCol;
    const createMajor = (e) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const majorObj = {
                    ma_nganh: values.majorCode,
                    nhom_nganh: values.majorGroup,
                    name: values.name,
                    to_hop_mon: values.to_hop_mon.join(','),
                    creator: 0,
                    created: new Date().getTime(),
                    status: 1
                }
                setLoadingButton(true);
                const opt = {
                    url: CREATE_MAJOR,
                    method: 'POST',
                    data: majorObj
                }
                requestAPI(opt)
                    .then(({ data }) => {
                        setLoadingButton(false)
                        if (data && data.status === 200) {
                            displayDialog(DIALOG_SUCCESS, data.message, '', () => Router.push('/major'))
                        } else {
                            displayDialog(DIALOG_ERROR, data.errorMessage || 'Có lỗi xảy ra')
                        }
                    }).catch(({ response }) => {
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
                            <Form.Item label="Major's name" hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: configRule.name
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Major's code" hasFeedback>
                                {getFieldDecorator('majorCode', {
                                    rules: configRule.code
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Subject combination" hasFeedback>
                                {getFieldDecorator('to_hop_mon', {
                                    rules: configRule.to_hop
                                })(
                                    <Select mode="multiple" placeholder="Please select subject combination">
                                        {
                                            TO_HOP_MON.map((item, index) => {
                                                return <Option key={index} value={item}>{item}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={span} md={md} lg={lg}>
                            <Form.Item label="Group's major" hasFeedback>
                                {getFieldDecorator('majorGroup', {
                                    rules: configRule.group
                                })(<Input />)}
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