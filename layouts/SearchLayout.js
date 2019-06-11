import { Fragment } from "react";
import InputLayout from './InputLayout';
import ButtonLayout from './ButtonLayout';
import { Row, Col } from 'antd';

const SearchLayout = ({}) => {
    return (
        <Fragment>
            <Row>
                <Col span={18}>
                    <InputLayout placeholder="Input search" />
                </Col>
                <Col span={6}>
                    <ButtonLayout text="Search" type="primary" size="big" />
                </Col>
            </Row>
    </Fragment>
    )
}

export default SearchLayout;