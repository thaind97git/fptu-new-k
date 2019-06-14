import { Row, Col } from 'antd';
import SearchLayout from '../layouts/SearchLayout'
import InputLayout from '../layouts/InputLayout';
import ButtonLayout from '../layouts/ButtonLayout';


const HeaderContent = ({ title, isSearch }) => {
    return (
        <div className="card">
            <Row>
                <Col pull={1} span={24} lg={10}>
                    <h2>{title}</h2>
                </Col>
                {
                    isSearch && (
                        <Col span={24} lg={14}>
                            <Row>
                                <Col span={18}>
                                    <InputLayout placeholder="Input search" />
                                </Col>
                                <Col span={6}>
                                    <ButtonLayout text="Search" type="primary" size="middle" />
                                </Col>
                            </Row>
                        </Col>
                    )
                }
            </Row>
            <style jsx>{`
                h2{
                    padding: 10px 0
                }
            `}</style>
        </div>
    )
}
export default HeaderContent;