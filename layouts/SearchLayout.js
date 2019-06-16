import { Fragment } from "react";
import InputLayout from './InputLayout';
import { Row, Col, Button } from 'antd';

const SearchLayout = ({}) => {
    return (
        <Fragment>
            <Row>
                <Col span={18}>
                    <InputLayout placeholder="Input search" />
                </Col>
                <Col span={6}>
                    <Button icon="search" type="primary"> Search </Button>
                </Col>
            </Row>
    </Fragment>
    )
}

export default SearchLayout;