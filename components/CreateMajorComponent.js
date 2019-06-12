import { Form, Input, Button, Col, Row, Checkbox } from 'antd';
import HeaderContent from '../components/HeaderContent';
import { Fragment } from 'react';


const createMajor = (e, props) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
        console.log(values)
        if (!err) {
            console.log('Received values of form: ', values);
        }
    });
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 },
        lg: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 18 },
        lg: { span: 18 }
    },
};

const CreateMajorComponent = (props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Fragment>
            <HeaderContent title="Create new major" />
            <Form  {...formItemLayout} onSubmit={() => createMajor(event, props)}>
                <Row>
                    <Col span={24} md={24} lg={12}>
                        <Form.Item label="Tên ngành" hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: "Major name is required !"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={24} md={24} lg={12}>
                        <Form.Item label="Mã ngành" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    }
                                ],
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} md={24} lg={12}>
                        <Form.Item label="Tổ hợp môn" hasFeedback>
                            {getFieldDecorator('gourp-major', {
                                rules: [
                                    {
                                        required: true,
                                        message: "Major name is required !"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={24} md={24} lg={12}>
                        <Form.Item label="Active">
                            {getFieldDecorator('active', {
                                valuePropName: 'checked',
                            })(<Checkbox>Active</Checkbox>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create new major
                </Button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}

const WrappedCreateMajor = Form.create()(CreateMajorComponent)

export default WrappedCreateMajor;