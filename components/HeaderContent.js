import { Row, Col } from 'antd';
import SearchLayout from '../layouts/SearchLayout'
import InputLayout from '../layouts/InputLayout';
import ButtonLayout from '../layouts/ButtonLayout';


const HeaderContent = ({}) => {
    return (
            <div className="header-content">
                <Row>
                    <Col xs={24} sm={24} md={12}>
                        <h2>Major Component</h2>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <Row>
                            <Col span={18}>
                                <InputLayout placeholder="Input search" />
                            </Col>
                            <Col span={6}>
                                <ButtonLayout text="Search" type="primary" size="big" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <style jsx>{`
                    .header-content {
                        padding: 20px 0 25px 0;
                        border: none;
                        margin: 20px 0;
                        box-shadow: 0px 1px 10px -3px rgba(0,0,0,0.15)
                    }
                `}</style>
            </div>
    )
}
export default HeaderContent;